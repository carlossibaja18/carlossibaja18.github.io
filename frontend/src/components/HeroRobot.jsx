import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const MODEL = "/models/fairino-fr3-wms-rigged.glb";
const ENV = "/models/studio-env.hdr";

/*
 * Joint animation loop (degrees, file-frame joint axes baked into the rig):
 * J1 base yaw (about rig +Y), J2 shoulder (about +X), J3 elbow (+Y),
 * J4 forearm roll (+X), J5 wrist pitch (+Y), J6 flange roll (+X).
 * Poses per spec; J1 reduced 30° -> 6° under the "safe angle" rule: the
 * shoulder housing sits 0.168 m off the yaw axis and would dip below the
 * base plane beyond ~7°. J4/J6 are rigged but held at zero in this cycle.
 * Timeline: home 1s -> reach 2s -> weld 1.5s -> hold 1s -> lift 2s ->
 * return 2s -> pause 1s, seamless 10.5 s loop, cosine ease-in-out.
 */
const KEYFRAMES = [
  { t: 0.0, j: [0, 0, 0, 0, 0, 0] },
  { t: 1.0, j: [0, 0, 0, 0, 0, 0] },
  { t: 3.0, j: [6, 20, 30, 0, 0, 0] },
  { t: 4.5, j: [6, 20, 40, 0, 20, 0] },
  { t: 5.5, j: [6, 20, 40, 0, 20, 0] },
  { t: 7.5, j: [6, 20, 30, 0, 0, 0] },
  { t: 9.5, j: [0, 0, 0, 0, 0, 0] },
  { t: 10.5, j: [0, 0, 0, 0, 0, 0] },
];
const LOOP = KEYFRAMES[KEYFRAMES.length - 1].t;
const JOINT_NODES = ["J1", "J2", "J3", "J4", "J5", "J6"];
// local rotation axis per joint node (single-axis Euler components)
const JOINT_AXES = ["y", "x", "y", "x", "y", "x"];

const easeInOut = (u) => 0.5 - 0.5 * Math.cos(Math.PI * u);

function poseAt(time) {
  const t = ((time % LOOP) + LOOP) % LOOP;
  let i = 0;
  while (i < KEYFRAMES.length - 2 && KEYFRAMES[i + 1].t <= t) i++;
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const u = b.t === a.t ? 0 : Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t)));
  const s = easeInOut(u);
  return a.j.map((ja, k) => ja + (b.j[k] - ja) * s);
}

export const HeroRobot = () => {
  const ref = useRef(null);
  const dragged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 50);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minPolarAngle = THREE.MathUtils.degToRad(45);
    controls.maxPolarAngle = THREE.MathUtils.degToRad(100);
    controls.rotateSpeed = 0.7;

    let joints = null;
    let disposed = false;
    let running = false;
    let raf = 0;
    let animTime = 0;
    let last = null;

    const setSize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (reduced && joints) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(el);
    setSize();

    // track drag vs click so orbiting never opens the project modal
    let downX = 0, downY = 0;
    const onDown = (e) => {
      downX = e.clientX; downY = e.clientY; dragged.current = false;
    };
    const onMove = (e) => {
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) dragged.current = true;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);

    const applyPose = (deg) => {
      if (!joints) return;
      deg.forEach((d, i) => {
        joints[i].rotation[JOINT_AXES[i]] = THREE.MathUtils.degToRad(d);
      });
    };

    const tick = (now) => {
      if (!running) return;
      if (last == null) last = now;
      animTime += (now - last) / 1000;
      last = now;
      applyPose(poseAt(animTime));
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || disposed || reduced || !joints) return;
      running = true; last = null;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let inView = false;
    const maybe = () => (inView && !document.hidden ? start() : stop());
    const io = new IntersectionObserver((es) => {
      inView = es[0]?.isIntersecting ?? false;
      maybe();
    }, { threshold: 0.02 });
    io.observe(el);
    const onVis = () => maybe();
    document.addEventListener("visibilitychange", onVis);

    (async () => {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const [gltf, hdr] = await Promise.all([
        new GLTFLoader().loadAsync(MODEL),
        new HDRLoader().loadAsync(ENV),
      ]);
      if (disposed) return;
      scene.environment = pmrem.fromEquirectangular(hdr).texture;
      hdr.dispose();
      pmrem.dispose();

      const model = gltf.scene;
      model.traverse((o) => {
        if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; }
      });
      scene.add(model);
      joints = JOINT_NODES.map((n) => model.getObjectByName(n));

      // frame the model exactly like the previous model-viewer setup:
      // target = bbox center, orbit 20deg / 76deg, radius ~158% of fit distance
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const fitRadius = 0.5 * size.length();
      const dist = 1.58 * (fitRadius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)));
      const az = THREE.MathUtils.degToRad(20);
      const pol = THREE.MathUtils.degToRad(76);
      camera.position.set(
        center.x + dist * Math.sin(pol) * Math.sin(az),
        center.y + dist * Math.cos(pol),
        center.z + dist * Math.sin(pol) * Math.cos(az)
      );
      controls.target.copy(center);
      controls.update();

      // soft key light + contact shadow, matching the previous shadow feel
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(center.x + 0.8, center.y + 1.4, center.z + 1.1);
      key.target.position.copy(center);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      const sc = key.shadow.camera;
      sc.left = -0.6; sc.right = 0.6; sc.top = 0.8; sc.bottom = -0.8;
      sc.near = 0.1; sc.far = 5;
      key.shadow.radius = 6;
      scene.add(key, key.target);

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.ShadowMaterial({ opacity: 0.3 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(center.x, box.min.y, center.z);
      ground.receiveShadow = true;
      scene.add(ground);

      if (reduced) {
        applyPose(KEYFRAMES[0].j);
        renderer.render(scene, camera);
        const still = () => renderer.render(scene, camera);
        controls.addEventListener("change", still);
        el.__stillCleanup = () => controls.removeEventListener("change", still);
      } else {
        maybe();
      }
    })().catch((err) => console.error("HeroRobot load failed:", err));

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.__stillCleanup?.();
      controls.dispose();
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry?.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m?.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-testid="hero-centerpiece"
      className="absolute inset-0"
      onClickCapture={(e) => {
        if (dragged.current) {
          e.stopPropagation();
          e.preventDefault();
          dragged.current = false;
        }
      }}
    />
  );
};

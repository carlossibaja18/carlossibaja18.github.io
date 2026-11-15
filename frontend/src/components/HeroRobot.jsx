import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const MODEL = "/models/fairino-fr3-wms-rigged.glb";
const ENV = "/models/studio-env.hdr";

/*
 * Joint animation loop (degrees) on the re-measured rig v2:
 * J1 base yaw (+Y), J2 shoulder pitch (+X through barrel center 0.14,0.14,0),
 * J3 elbow pitch (+X through barrel center 0.11,0.14,0.28 — the wrist-1
 * housing is coaxial with this axis, so its spin is seam-free at any angle),
 * J4 column roll (+Z), J5 wand pitch (+Y through the wand-root collar
 * 0.06,0.038,0.52 — the tool tube pitches nose-down inside its root pocket),
 * J6 flange roll (+X along the wand).
 * Five-pose 11 s loop: Home 0.8s -> Reach 2.2s -> Weld Dip 1.2s -> hold 0.9s
 * -> Lift 1.6s -> Return 2.2s -> Home dwell 2.1s. J1/J2/J3/J5 always move
 * together, cosine-eased. J4/J6 rigged, held at zero for this cycle.
 */
const KEYFRAMES = [
  { t: 0.0, j: [0, 0, 0, 0, 0, 0] },      // Home (0%)
  { t: 0.8, j: [0, 0, 0, 0, 0, 0] },
  { t: 3.0, j: [6, 15, 25, 0, 0, 0] },    // Reach (~27%)
  { t: 4.2, j: [6, 20, 35, 0, 20, 0] },   // Weld Dip
  { t: 5.1, j: [6, 20, 35, 0, 20, 0] },   // hold the weld
  { t: 6.7, j: [6, 18, 30, 0, 10, 0] },   // Lift
  { t: 8.9, j: [0, 0, 0, 0, 0, 0] },      // Return Home
  { t: 11.0, j: [0, 0, 0, 0, 0, 0] },     // Home dwell (100%)
];
const LOOP = KEYFRAMES[KEYFRAMES.length - 1].t;
const JOINT_NODES = ["J1", "J2", "J3", "J4", "J5", "J6"];
// local rotation axis per joint node (single-axis Euler components)
const JOINT_AXES = ["y", "x", "x", "z", "y", "x"];

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
    renderer.shadowMap.type = THREE.PCFShadowMap;
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

    // test hook: seek to an absolute loop time (seconds), render one frame
    el.__setTime = (t) => {
      if (!joints) return false;
      stop();
      animTime = t;
      applyPose(poseAt(animTime));
      controls.update();
      renderer.render(scene, camera);
      return true;
    };
    el.__scene = scene;
    el.__isRunning = () => running;

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
      delete el.__setTime;
      delete el.__scene;
      delete el.__isRunning;
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

"""FK verification v2: render the rigged FR3 at loop poses + collision checks.

Joint axes (file frame): J1 +Y, J2 +X, J3 +X, J4 +Z, J5 +Y, J6 +X.
world_T(link_i) = root * T_J1*R_1 * ... * T_Ji*R_i * trans(-pivot_i).
"""
import numpy as np
import trimesh
from trimesh.transformations import rotation_matrix, translation_matrix
from scipy.spatial import cKDTree
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

DST = "/app/frontend/public/models/fairino-fr3-wms-rigged.glb"

PIVOTS = {
    "J1": np.array([0.00, 0.07, 0.00]),
    "J2": np.array([0.14, 0.14, 0.00]),
    "J3": np.array([0.11, 0.14, 0.28]),
    "J4": np.array([0.00, 0.14, 0.40]),
    "J5": np.array([0.06, 0.038, 0.52]),
    "J6": np.array([0.16, 0.038, 0.52]),
}
ORDER = ["J1", "J2", "J3", "J4", "J5", "J6"]
AXES = {"J1": [0, 1, 0], "J2": [1, 0, 0], "J3": [1, 0, 0],
        "J4": [0, 0, 1], "J5": [0, 1, 0], "J6": [1, 0, 0]}

POSES = {
    "P1_home":  [0, 0, 0, 0, 0, 0],
    "P2_reach": [6, 15, 25, 0, 0, 0],
    "P3_weld":  [6, 20, 35, 0, 20, 0],
    "mid_in":   [3, 9, 14, 0, 3, 0],     # ~55% into home->reach
    "mid_lift": [6, 17, 29, 0, 9, 0],    # mid lift pose
}
FLOOR_Y = -0.064  # world Y of static base bottom after bake


def link_transforms(angles_deg):
    T = rotation_matrix(np.radians(-90), [1, 0, 0])
    out = {}
    prev = np.zeros(3)
    for i, j in enumerate(ORDER):
        T = T @ translation_matrix(PIVOTS[j] - prev)
        T = T @ rotation_matrix(np.radians(angles_deg[i]), AXES[j])
        out[i + 1] = T @ translation_matrix(-PIVOTS[j])
        prev = PIVOTS[j]
    out[0] = rotation_matrix(np.radians(-90), [1, 0, 0])
    return out


def world_verts(sc, li, Ts):
    g = sc.geometry[f"link_{'base' if li == 0 else f'J{li}'}"]
    return trimesh.transformations.transform_points(g.vertices, Ts[li])


def main():
    sc = trimesh.load(DST)
    for pname, ang in POSES.items():
        Ts = link_transforms(ang)
        ymin = min(world_verts(sc, li, Ts)[:, 1].min() for li in range(7))
        # collision: wand (L5+L6) vs lower arm column (L2) and upper column (L3+L4)
        wand = np.vstack([world_verts(sc, 5, Ts)[::15], world_verts(sc, 6, Ts)[::15]])
        arm = np.vstack([world_verts(sc, 2, Ts)[::15], world_verts(sc, 3, Ts)[::15], world_verts(sc, 4, Ts)[::15]])
        d = cKDTree(arm).query(wand)[0].min()
        print(f"{pname}: minY={ymin:.4f} (floor {FLOOR_Y})  wand-arm min gap={d*1000:.1f}mm")

    # pose strip: P1, mid_in, P2, P3, mid_lift from a site-like camera
    fig = plt.figure(figsize=(22, 7))
    items = list(POSES.items())
    for k, (pname, ang) in enumerate(items):
        Ts = link_transforms(ang)
        ax = fig.add_subplot(1, len(items), k + 1, projection="3d")
        for li in range(7):
            g = sc.geometry[f"link_{'base' if li == 0 else f'J{li}'}"]
            Vw = trimesh.transformations.transform_points(g.vertices, Ts[li])
            ax.plot_trisurf(Vw[:, 0], -Vw[:, 2], Vw[:, 1], triangles=g.faces[::12],
                            color="#c9ccd2", edgecolor="none", shade=True)
        ax.view_init(elev=10, azim=-70)
        ax.set_box_aspect((0.45, 0.45, 0.65))
        ax.set_axis_off(); ax.set_title(pname, fontsize=10)
    plt.tight_layout(); plt.savefig("/tmp/fk2_poses.png", dpi=95)

    # seam close-ups at max deflection (P3): elbow barrel/blob + wand root
    Ts = link_transforms(POSES["P3_weld"])
    fig2 = plt.figure(figsize=(18, 7))
    zooms = [("elbow seam @P3", (0.0, 0.20), (0.20, 0.40), (-0.25, 0.20)),
             ("wand root seam @P3", (-0.05, 0.25), (0.30, 0.60), (-0.45, 0.20))]
    for j, (t, xl, zl, yl) in enumerate(zooms):
        ax = fig2.add_subplot(1, 2, j + 1, projection="3d")
        for li in range(7):
            g = sc.geometry[f"link_{'base' if li == 0 else f'J{li}'}"]
            Vw = trimesh.transformations.transform_points(g.vertices, Ts[li])
            ax.plot_trisurf(Vw[:, 0], Vw[:, 1], Vw[:, 2], triangles=g.faces[::4],
                            color="#c9ccd2", edgecolor="none", shade=True)
        ax.view_init(elev=8, azim=-70)
        ax.set_xlim(*xl); ax.set_ylim(*yl); ax.set_zlim(*zl)
        ax.set_title(t, fontsize=10)
    plt.tight_layout(); plt.savefig("/tmp/fk2_seams.png", dpi=100)
    print("saved /tmp/fk2_poses.png /tmp/fk2_seams.png")


if __name__ == "__main__":
    main()

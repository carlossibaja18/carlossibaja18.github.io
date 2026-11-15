"""FK verification: render the rigged FR3 at loop poses with matplotlib.

Applies joint rotations in the file frame (Z-up) exactly as three.js will:
world_T(link_i) = T_root * T_J1*R_1 * ... * T_Ji*R_i * trans(-pivot_i).
"""
import sys
import numpy as np
import trimesh
from trimesh.transformations import rotation_matrix, translation_matrix
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

DST = "/app/frontend/public/models/fairino-fr3-wms-rigged.glb"

PIVOTS = {
    "J1": np.array([0.00, 0.07, 0.00]),
    "J2": np.array([0.14, 0.14, 0.00]),
    "J3": np.array([0.115, 0.14, 0.30]),
    "J4": np.array([0.05, 0.14, 0.295]),
    "J5": np.array([0.00, 0.14, 0.36]),
    "J6": np.array([0.16, 0.038, 0.52]),
}
ORDER = ["J1", "J2", "J3", "J4", "J5", "J6"]
AXES = {"J1": [0, 1, 0], "J2": [1, 0, 0], "J3": [0, 1, 0],
        "J4": [1, 0, 0], "J5": [0, 1, 0], "J6": [1, 0, 0]}

POSES = {
    "P1_home":  [0, 0, 0, 0, 0, 0],
    "P2_reach": [6, 20, 30, 0, 0, 0],
    "P3_weld":  [6, 20, 40, 0, 20, 0],
}

# zoom windows: (name, pose, xlim, ylim_file... in plot coords x, -z_world, y_world)
ZOOMS = [
    ("P2 shoulder seam", "P2_reach", (0.05, 0.22), (-0.03, 0.10), (-0.05, 0.12)),
    ("P3 wrist seam", "P3_weld", (-0.10, 0.25), (0.35, 0.62), (-0.05, 0.30)),
    ("P3 elbow seam", "P3_weld", (0.00, 0.20), (0.20, 0.40), (-0.05, 0.30)),
]


def link_transforms(angles_deg):
    """Return {link_index: 4x4 world matrix} in the Y-up baked frame."""
    T = rotation_matrix(np.radians(-90), [1, 0, 0])  # root
    out = {}
    prev_pivot = np.zeros(3)
    for i, j in enumerate(ORDER):
        T = T @ translation_matrix(PIVOTS[j] - prev_pivot)
        T = T @ rotation_matrix(np.radians(angles_deg[i]), AXES[j])
        out[i + 1] = T @ translation_matrix(-PIVOTS[j])
        prev_pivot = PIVOTS[j]
    out[0] = rotation_matrix(np.radians(-90), [1, 0, 0])  # static base under root
    return out


def main():
    sc = trimesh.load(DST)
    for pname, ang in POSES.items():
        Ts = link_transforms(ang)
        ymin = 9e9
        for li in range(7):
            g = sc.geometry[f"link_{'base' if li == 0 else f'J{li}'}"]
            Vw = trimesh.transformations.transform_points(g.vertices, Ts[li])
            ymin = min(ymin, Vw[:, 1].min())
        print(f"{pname}: world minY={ymin:.4f} (static base bottom = -0.064)")
    fig = plt.figure(figsize=(18, 6))
    for j, (zname, pname, xlim, ylim, zlim) in enumerate(ZOOMS):
        Ts = link_transforms(POSES[pname])
        ax = fig.add_subplot(1, 3, j + 1, projection="3d")
        for li in range(7):
            g = sc.geometry[f"link_{'base' if li == 0 else f'J{li}'}"]
            Vw = trimesh.transformations.transform_points(g.vertices, Ts[li])
            ax.plot_trisurf(Vw[:, 0], -Vw[:, 2], Vw[:, 1], triangles=g.faces[::6],
                            color="#c9ccd2", edgecolor="none", shade=True)
        ax.view_init(elev=10, azim=-75)
        ax.set_xlim(*xlim); ax.set_ylim(*ylim); ax.set_zlim(*zlim)
        ax.set_title(zname, fontsize=10)
    plt.tight_layout(); plt.savefig("/tmp/fk_seams.png", dpi=110)
    print("saved /tmp/fk_seams.png")


if __name__ == "__main__":
    main()

def color_render():
    COLORS = ["#888888", "#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"]
    sc = trimesh.load(DST)
    fig = plt.figure(figsize=(20, 10))
    for k, (pname, view) in enumerate([("P1_home", (10, -62)), ("P1_home", (10, 28)),
                                       ("P3_weld", (10, -62)), ("P3_weld", (10, 28))]):
        Ts = link_transforms(POSES[pname])
        ax = fig.add_subplot(2, 2, k + 1, projection="3d")
        for li in range(7):
            g = sc.geometry[f"link_{'base' if li == 0 else f'J{li}'}"]
            Vw = trimesh.transformations.transform_points(g.vertices, Ts[li])
            ax.plot_trisurf(Vw[:, 0], -Vw[:, 2], Vw[:, 1], triangles=g.faces[::10],
                            color=COLORS[li], edgecolor="none", shade=False)
        ax.view_init(elev=view[0], azim=view[1])
        ax.set_box_aspect((0.5, 0.5, 0.62)); ax.set_axis_off()
        ax.set_title(f"{pname} az{view[1]} (L0 gray L1 red L2 blue L3 green L4 purple L5 orange L6 yellow)", fontsize=8)
    plt.tight_layout(); plt.savefig("/tmp/fk_colors.png", dpi=95)
    print("saved /tmp/fk_colors.png")

color_render()

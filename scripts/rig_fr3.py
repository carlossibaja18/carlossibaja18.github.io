"""Rig the FAIRINO FR3-WMS single-mesh GLB into a 6-joint articulated GLB (v2).

v2 fixes (user-reported): elbow dislocation gap, locked wrist, rigid-hook swing.
Root causes in v1: J3 rotated about the WRONG axis (Y) which tore the elbow
barrel open, and the wrist had no pivot of its own.

Measured joint structure (file frame, Z-up CAD, meters) — all pitch barrels
are X-axis cylinders; the arm's working plane is Y-Z (toward viewer after the
baked Z-up->Y-up correction):
  J1 base yaw     axis +Y through (0,     0.07,  0    )  puck/turret interface
  J2 shoulder     axis +X through (0.14,  0.14,  0.0  )  shoulder barrel center
  J3 elbow        axis +X through (0.11,  0.14,  0.28 )  elbow barrel center;
                  the wrist-1 housing blob (0.005,0.14,0.288) is COAXIAL with
                  this axis -> spinning it is seam-free at every angle
  J4 column roll  axis +Z through (0,     0.14,  0.40 )  mid upper column
  J5 wrist pitch  axis +Y through (0.06,  0.038, 0.52 )  wand root collar centre
                  (wand = tool tube at y~=0.038, offset toward viewer from the
                  y=0.14 arm plane; it pitches nose-down inside its root pocket)
  J6 flange roll  axis +X through (0.16,  0.038, 0.52 )  along the wand
No geometry is cut or modified: 2539 CAD solids are only re-grouped by link.
A root node bakes the Z-up -> Y-up correction (model-viewer orientation 0 -90 0).
"""
import numpy as np
import trimesh
from trimesh.transformations import rotation_matrix, translation_matrix

SRC = "/app/frontend/public/models/fairino-fr3-wms.glb"
DST = "/app/frontend/public/models/fairino-fr3-wms-rigged.glb"

PIVOTS = {
    "J1": np.array([0.00, 0.07, 0.00], dtype=float),
    "J2": np.array([0.14, 0.14, 0.00], dtype=float),
    "J3": np.array([0.11, 0.14, 0.28], dtype=float),
    "J4": np.array([0.00, 0.14, 0.40], dtype=float),
    "J5": np.array([0.06, 0.038, 0.52], dtype=float),
    "J6": np.array([0.16, 0.038, 0.52], dtype=float),
}
ORDER = ["J1", "J2", "J3", "J4", "J5", "J6"]


def assign(c):
    """Component centroid -> link id (L0 static .. L6 flange)."""
    x, y, z = c
    if y < 0.075 and z < 0.12:
        return "L0"                          # base puck + mounting feet (bottom only)
    if z > 0.47 and y < 0.10:
        return "L6" if x > 0.16 else "L5"    # tool wand (offset tube) + its flange
    if z < 0.055:
        return "L2" if x > 0.105 else "L1"   # shoulder barrel -> L2 (coaxial spin); turret+bar -> L1
    if z < 0.24:
        return "L2"                          # lower column
    if z < 0.36:
        if x >= 0.05:
            return "L2"                      # elbow barrel stays with lower column
        return "L3"                          # wrist-1 housing blob (coaxial J3 output)
    if z < 0.42:
        return "L3"                          # upper column, lower half
    return "L4"                              # upper column top + wrist head barrel


def main():
    scene = trimesh.load(SRC)
    geom = scene.geometry["RD37.3-FR3WMS-V1.0-1"]
    m = geom.visual.material

    parts = geom.split(only_watertight=False)
    groups = {f"L{i}": [] for i in range(7)}
    for p in parts:
        groups[assign(p.centroid)].append(p)
    for k in groups:
        print(f"{k}: {len(groups[k])} parts, {sum(len(p.faces) for p in groups[k])} faces")

    def make_link(key):
        link = trimesh.util.concatenate(groups[key])
        link.visual.material = trimesh.visual.material.PBRMaterial(
            baseColorFactor=m.baseColorFactor,
            metallicFactor=m.metallicFactor,
            roughnessFactor=m.roughnessFactor,
        )
        return link

    out = trimesh.Scene()
    # trimesh graph.update: frame_from = PARENT, frame_to = CHILD,
    # matrix = child -> parent local transform
    out.graph.update(frame_from=out.graph.base_frame, frame_to="root",
                     matrix=rotation_matrix(np.radians(-90), [1, 0, 0]))
    parent, parent_pivot = "root", np.zeros(3)
    for i, jname in enumerate(ORDER):
        piv = PIVOTS[jname]
        out.graph.update(frame_from=parent, frame_to=jname,
                         matrix=translation_matrix(piv - parent_pivot))
        out.add_geometry(make_link(f"L{i+1}"), node_name=f"mesh_{jname}",
                         parent_node_name=jname,
                         transform=translation_matrix(-piv), geom_name=f"link_{jname}")
        parent, parent_pivot = jname, piv
    out.add_geometry(make_link("L0"), node_name="mesh_base", parent_node_name="root",
                     transform=np.eye(4), geom_name="link_base")

    out.export(DST)
    print("wrote", DST)
    chk = trimesh.load(DST)
    print("nodes:", sorted(chk.graph.nodes))
    total = sum(len(g.faces) for g in chk.geometry.values())
    print("total faces out:", total, "(in:", len(geom.faces), ")")


if __name__ == "__main__":
    main()

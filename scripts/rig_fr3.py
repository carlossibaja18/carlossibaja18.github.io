"""Rig the FAIRINO FR3-WMS single-mesh GLB into a 6-joint articulated GLB.

Approach: split the Draco-compressed single mesh into connected CAD components
(~2539 solids), assign each component to a robot link by centroid region rules
(no geometry is cut or modified — zero visual seams at rest), merge per link,
and emit a node hierarchy J1..J6 whose node origins are the measured joint
pivot points. Rotating a J-node in three.js rotates all downstream links.

File frame: Z-up CAD, meters. Joint chain (measured from geometry):
  J1 base yaw      axis +Y through (0,    0.07, 0    )  (puck/turret interface)
  J2 shoulder      axis +X through (0.14, 0.14, 0.0  )  (barrel housing)
  J3 elbow         axis +Y through (0.115,0.14, 0.30 )
  J4 forearm roll  axis +X through (0.05, 0.14, 0.295)
  J5 wrist pitch   axis +Y through (0.0,  0.14, 0.36 )  (top of wrist-1 housing)
  J6 flange roll   axis +X through (0.16, 0.038,0.52 )  (along the tool wand)
The tool wand at the arm's end sits at y~=0.038 (offset toward viewer), NOT in
the y=0.14 arm plane — the L0 static rule must therefore also require low z.
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
    "J3": np.array([0.115, 0.14, 0.30], dtype=float),
    "J4": np.array([0.05, 0.14, 0.295], dtype=float),
    "J5": np.array([0.00, 0.14, 0.36], dtype=float),
    "J6": np.array([0.16, 0.038, 0.52], dtype=float),
}
ORDER = ["J1", "J2", "J3", "J4", "J5", "J6"]


def assign(c):
    """Component centroid -> link id (L0 static .. L6 flange)."""
    x, y, z = c
    if y < 0.075 and z < 0.12:
        return "L0"                         # base puck + mounting feet (bottom only)
    if z < 0.055:
        return "L2" if x > 0.105 else "L1"  # shoulder barrel -> L2 (coaxial seam); turret+bar -> L1
    if z < 0.27:
        return "L2"                         # long column (lower arm)
    if z < 0.36:
        if x >= 0.105:
            return "L2"                     # elbow casting stays with lower arm
        if x >= 0.045:
            return "L3"                     # forearm tube, right half (J3 output)
        return "L4"                         # forearm left end + wrist-1 housing blob (J4 output)
    if x > 0.16 and z > 0.47:
        return "L6"                         # tool flange cap (J6 output)
    return "L5"                             # upper column + wrist head + tool wand (J5 output)


def main():
    scene = trimesh.load(SRC)
    geom = scene.geometry["RD37.3-FR3WMS-V1.0-1"]
    m = geom.visual.material
    print("material:", m.baseColorFactor, m.metallicFactor, m.roughnessFactor)
    print("vertex normals present:", len(getattr(geom, "vertex_normals", [])) == len(geom.vertices))

    parts = geom.split(only_watertight=False)
    print("components:", len(parts))

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
    # root: bake Z-up -> Y-up correction
    # trimesh graph.update: frame_from = PARENT, frame_to = CHILD,
    # matrix = child -> parent local transform
    out.graph.update(frame_from=out.graph.base_frame, frame_to="root",
                     matrix=rotation_matrix(np.radians(-90), [1, 0, 0]))
    parent, parent_pivot = "root", np.zeros(3)
    for i, jname in enumerate(ORDER):
        piv = PIVOTS[jname]
        out.graph.update(frame_from=parent, frame_to=jname,
                         matrix=translation_matrix(piv - parent_pivot))
        link = make_link(f"L{i+1}")
        out.add_geometry(link, node_name=f"mesh_{jname}", parent_node_name=jname,
                         transform=translation_matrix(-piv), geom_name=f"link_{jname}")
        parent, parent_pivot = jname, piv
    out.add_geometry(make_link("L0"), node_name="mesh_base", parent_node_name="root",
                     transform=np.eye(4), geom_name="link_base")

    out.export(DST)
    print("wrote", DST)

    chk = trimesh.load(DST)
    print("nodes:", sorted(chk.graph.nodes))
    print("geometry:", list(chk.geometry.keys()))
    total = sum(len(g.faces) for g in chk.geometry.values())
    print("total faces out:", total, "(in:", len(geom.faces), ")")


if __name__ == "__main__":
    main()

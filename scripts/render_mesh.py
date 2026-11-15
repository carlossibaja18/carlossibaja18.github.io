import trimesh, numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
s = trimesh.load("frontend/public/models/fairino-fr3-wms.glb")
g = s.geometry['RD37.3-FR3WMS-V1.0-1']
F = g.faces[::10]
V = g.vertices
fig = plt.figure(figsize=(16, 10))
# front elevation: looking along -y => x right, z up
ax = fig.add_subplot(1, 2, 1, projection='3d')
ax.plot_trisurf(V[:,0], V[:,1], V[:,2], triangles=F, color="#c9ccd2", edgecolor='none', shade=True)
ax.view_init(elev=0, azim=-90)
ax.set_box_aspect((0.27, 0.2, 0.62)); ax.set_title("FRONT: x horizontal, z vertical")
ax.set_xlabel("x"); ax.set_zlabel("z"); ax.set_yticks([])
# side elevation: looking along +x => y right?, z up
ax = fig.add_subplot(1, 2, 2, projection='3d')
ax.plot_trisurf(V[:,0], V[:,1], V[:,2], triangles=F, color="#c9ccd2", edgecolor='none', shade=True)
ax.view_init(elev=0, azim=0)
ax.set_box_aspect((0.27, 0.2, 0.62)); ax.set_title("SIDE: y horizontal, z vertical")
ax.set_ylabel("y"); ax.set_zlabel("z"); ax.set_xticks([])
plt.tight_layout(); plt.savefig("/tmp/mesh_elev.png", dpi=110)
print("done")

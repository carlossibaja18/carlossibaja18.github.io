"""Generate a true Radiance .hdr (RGBE) equirect studio environment for the hero robot.

Art direction mirrors the old studio-env.png (cool overhead key, cool-blue rim
lower-left, warm-orange rim right, dark floor) but with real HDR intensities so
specular reflections get punch instead of clipping at 1.0.
"""
import numpy as np

W, H = 2048, 1024

# u in [0,1) left->right (azimuth), v in [0,1] top->bottom (elevation)
u = (np.arange(W) + 0.5) / W
v = (np.arange(H) + 0.5) / H
U, V = np.meshgrid(u, v)


def blob(cu, cv, su, sv, color, intensity):
    """Soft anisotropic gaussian light panel in equirect uv space (wraps in u)."""
    du = np.minimum(np.abs(U - cu), 1.0 - np.abs(U - cu))
    dv = V - cv
    g = np.exp(-(du**2) / (2 * su**2) - (dv**2) / (2 * sv**2))
    c = np.asarray(color, dtype=np.float64)
    return g[..., None] * c * intensity


# --- Base: dim cool-gray studio ambience, darker toward the floor ---
base_lum = 0.085 * (1.0 - V) ** 1.6 + 0.012
base = base_lum[..., None] * np.array([0.82, 0.90, 1.00])

env = base

# Overhead key: large softbox, neutral-cool white, strong (HDR range)
env += blob(0.40, 0.10, 0.085, 0.055, (0.95, 0.98, 1.05), 6.0)
# Secondary high fill, soft near-white, upper right
env += blob(0.78, 0.24, 0.08, 0.055, (0.90, 0.95, 1.00), 1.5)
# Cool-blue rim, lower-left (accent family #67D7FF)
env += blob(0.13, 0.55, 0.055, 0.10, (0.40, 0.72, 1.05), 3.2)
# Warm-orange rim, right side
env += blob(0.88, 0.50, 0.05, 0.09, (1.10, 0.72, 0.42), 2.8)
# Gentle floor bounce so the underside isn't dead black
env += blob(0.50, 0.97, 0.50, 0.05, (0.55, 0.62, 0.72), 0.18)

# --- Tone safety: soft-clip extreme outliers, keep panels hot ---
env = np.clip(env, 0.0, None)

# --- Write Radiance RGBE (.hdr), flat (non-RLE) scanlines ---
rgb = env.astype(np.float64)
rgbe = np.zeros((H, W, 4), dtype=np.uint8)
m = rgb.max(axis=2)
mask = m > 1e-32
mant, exp = np.frexp(m[mask])
scale = mant * 256.0 / m[mask]
rgbe[..., 0][mask] = (rgb[..., 0][mask] * scale).astype(np.uint8)
rgbe[..., 1][mask] = (rgb[..., 1][mask] * scale).astype(np.uint8)
rgbe[..., 2][mask] = (rgb[..., 2][mask] * scale).astype(np.uint8)
rgbe[..., 3][mask] = (exp + 128).astype(np.uint8)

out = "/app/frontend/public/models/studio-env.hdr"
with open(out, "wb") as f:
    f.write(b"#?RADIANCE\n")
    f.write(b"# custom studio env for FAIRINO FR3-WMS hero\n")
    f.write(b"FORMAT=32-bit_rle_rgbe\n\n")
    f.write(f"-Y {H} +X {W}\n".encode())
    f.write(rgbe.tobytes())

lum = 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]
print(f"wrote {out}  {W}x{H}")
print(f"avg luminance {lum.mean():.3f}  peak {lum.max():.2f}  >1.0 pixels {(lum > 1).mean() * 100:.1f}%")

import numpy as np
from PIL import Image

W, H = 1024, 512
# equirectangular coords
u = (np.arange(W) + 0.5) / W            # 0..1 azimuth
v = (np.arange(H) + 0.5) / H            # 0..1 elevation (0 top)
U, V = np.meshgrid(u, v)

# base ambient (very dark, slightly cool)
r = np.full((H, W), 0.020)
g = np.full((H, W), 0.028)
b = np.full((H, W), 0.045)


def blob(cx, cy, sx, sy, col, inten):
    # horizontal wrap distance
    dx = np.minimum(np.abs(U - cx), 1.0 - np.abs(U - cx))
    dy = V - cy
    d2 = (dx / sx) ** 2 + (dy / sy) ** 2
    falloff = np.exp(-d2)
    return col[0] * inten * falloff, col[1] * inten * falloff, col[2] * inten * falloff


lights = [
    # soft cool-white KEY light, upper front, broad and bright (keeps body neutral gray)
    (0.50, 0.22, 0.36, 0.24, (1.00, 1.00, 1.02), 2.05),
    # gentle cool fill from opposite, neutral
    (0.02, 0.42, 0.42, 0.32, (0.58, 0.64, 0.78), 0.50),
    # BLUE rim — placed toward the visible left-front edge, bright + a touch wide
    (0.32, 0.44, 0.15, 0.28, (0.18, 0.48, 1.00), 3.10),
    (0.44, 0.38, 0.11, 0.22, (0.20, 0.52, 1.00), 2.30),
    # WARM ORANGE accent, right edge — narrow rim, eased slightly for balance
    (0.86, 0.58, 0.11, 0.22, (1.00, 0.48, 0.12), 2.05),
    # subtle cool floor bounce
    (0.50, 0.93, 0.60, 0.14, (0.30, 0.34, 0.44), 0.26),
]

for cx, cy, sx, sy, col, inten in lights:
    rr, gg, bb = blob(cx, cy, sx, sy, col, inten)
    r += rr; g += gg; b += bb

rgb = np.stack([r, g, b], axis=-1)
# soft tonemap to keep highlights from clipping harshly
rgb = rgb / (1.0 + rgb * 0.55)
rgb = np.clip(rgb, 0, 1)
# gamma
rgb = rgb ** (1 / 2.2)
img = (rgb * 255).astype(np.uint8)
Image.fromarray(img, 'RGB').save('/app/frontend/public/models/studio-env.png')
print('saved studio-env.png', img.shape)

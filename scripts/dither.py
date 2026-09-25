"""Tramé ordonné bichrome des photos de projets : transforme des photos d'illustration
en « tirages de plan » cohérents avec la direction artistique (encre de nuit + une teinte).

Usage : python3 scripts/dither.py   (écrit public/img/projets/tram/*.webp)
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/img/projets/tram'
OUT.mkdir(parents=True, exist_ok=True)
NIGHT = np.array([8, 14, 24])
TINTS = {'blue': np.array([155, 198, 230]), 'orange': np.array([239, 164, 113])}
SOURCES = [
    ('orbita', 'img/blog/photo-1620712943543-bcc4688e7485-800.webp', 'blue'),
    ('aspiration', 'img/blog/photo-1581091226825-a6a2a5aee158-800.webp', 'orange'),
    ('migration', 'img/blog/photo-1531482615713-2afd69097998-800.webp', 'blue'),
    ('international', 'img/blog/photo-1544197150-b99a580bb7a8-800.webp', 'orange'),
    ('ratp', 'img/home/ratp-rail-700.webp', 'orange'),
    ('radar', 'img/blog/photo-1451187580459-43490279c0fa-800.webp', 'blue'),
]
# matrice de Bayer 8×8, normalisée dans ]0, 1[
B2 = np.array([[0, 2], [3, 1]])
B = B2
for _ in range(2):
    B = np.block([[4 * B, 4 * B + 2], [4 * B + 3, 4 * B + 1]])
B = (B + 0.5) / B.size

for name, src, tint in SOURCES:
    im = Image.open(ROOT / 'public' / src).convert('L')
    im = ImageOps.autocontrast(ImageOps.fit(im, (800, 560), method=Image.LANCZOS), cutoff=1)
    # le grain du tramé reste lisible : on travaille à demi-résolution puis on double
    small = np.asarray(im.resize((400, 280), Image.LANCZOS), dtype=float) / 255
    small = np.clip((small - 0.08) / 0.84, 0, 1) ** 0.9  # contraste
    h, w = small.shape
    thr = np.tile(B, (h // 8 + 1, w // 8 + 1))[:h, :w]
    on = small > thr
    rgb = np.where(on[..., None], TINTS[tint], NIGHT).astype(np.uint8)
    out = Image.fromarray(rgb).resize((800, 560), Image.NEAREST)
    out.save(OUT / f'{name}.webp', lossless=True, method=6)
    print(name, (OUT / f'{name}.webp').stat().st_size // 1024, 'Ko')

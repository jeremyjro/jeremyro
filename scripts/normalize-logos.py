"""Normalize company logos into uniform dark rounded-square cards.

Each source logo differs in canvas size, glyph scale, and background. This
script trims every glyph to its content bounding box and re-composites it,
centered, at a consistent target scale on an identical black square so the
glyphs read at the same visual size across the carousel. Dark wordmarks
(Reactor, Virio) are recolored to off-white so they remain legible on the
shared dark background; brand accents (Virio's orange dot) are preserved.
"""

from pathlib import Path

import numpy as np
from PIL import Image
import cairosvg

SRC = Path("public/startup-helper")
CANVAS = 512
GLYPH_RATIO = 0.60  # longest glyph dimension as a fraction of the canvas
BG = (12, 12, 12, 255)
INK = (245, 242, 236)  # off-white used when recoloring dark wordmarks


def content_bbox(alpha: np.ndarray) -> tuple[int, int, int, int]:
    ys, xs = np.where(alpha > 12)
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def place(glyph: Image.Image) -> Image.Image:
    x0, y0, x1, y1 = content_bbox(np.array(glyph)[:, :, 3])
    glyph = glyph.crop((x0, y0, x1, y1))
    target = int(CANVAS * GLYPH_RATIO)
    scale = target / max(glyph.width, glyph.height)
    glyph = glyph.resize(
        (max(1, round(glyph.width * scale)), max(1, round(glyph.height * scale))),
        Image.LANCZOS,
    )
    canvas = Image.new("RGBA", (CANVAS, CANVAS), BG)
    canvas.alpha_composite(
        glyph, ((CANVAS - glyph.width) // 2, (CANVAS - glyph.height) // 2)
    )
    return canvas


def from_dark_bg(path: Path) -> Image.Image:
    """Logo already light-on-dark: keep colors, derive alpha from brightness."""
    im = np.array(Image.open(path).convert("RGB")).astype(np.int16)
    alpha = np.clip(im.max(axis=2) * 3, 0, 255).astype(np.uint8)
    rgba = np.dstack([im.astype(np.uint8), alpha])
    return place(Image.fromarray(rgba, "RGBA"))


def from_light_bg(path: Path) -> Image.Image:
    """Logo is dark-on-light: recolor ink to off-white, drop white background."""
    im = np.array(Image.open(path).convert("RGB")).astype(np.int16)
    darkness = np.clip(255 - im.mean(axis=2), 0, 255).astype(np.uint8)
    ink = np.zeros((*darkness.shape, 4), dtype=np.uint8)
    ink[:, :, 0], ink[:, :, 1], ink[:, :, 2] = INK
    ink[:, :, 3] = darkness
    return place(Image.fromarray(ink, "RGBA"))


def from_virio_svg(path: Path) -> Image.Image:
    import re

    # Drop inline style attributes (they carry unsupported display-p3 fills
    # that cairosvg renders as black), leaving the presentation-attribute
    # fills; then recolor the dark ink to off-white and keep the orange dot.
    svg = re.sub(r'\s+style="[^"]*"', "", path.read_text())
    svg = svg.replace("#1B1B18", "#F5F2EC")
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=1200)
    from io import BytesIO

    return place(Image.open(BytesIO(png)).convert("RGBA"))


def main() -> None:
    outputs = {
        "mintlify": from_dark_bg(SRC / "mintlify.png"),
        "ornn": from_dark_bg(SRC / "ornn.png"),
        "reactor": from_light_bg(SRC / "reactor.webp"),
        "virio": from_virio_svg(SRC / "virio.svg"),
    }
    for name, img in outputs.items():
        out = SRC / f"{name}-card.png"
        img.convert("RGB").save(out, optimize=True)
        print(name, "->", out, img.size)


if __name__ == "__main__":
    main()

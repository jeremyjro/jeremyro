"""Applies the cursor push / click ripple displacement to the video2ascii
fragment shader in node_modules. Run, then `npx patch-package video2ascii`.
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "node_modules/video2ascii/dist"

OLD_MAIN = (
    "void main() {\\n  // Figure out which ASCII cell this pixel is in\\n"
    "  vec2 cellCoord = floor(v_texCoord * u_gridSize);"
)
NEW_MAIN_GLSL = """void main() {
  // Work in pixel space so the effects stay circular regardless of aspect
  vec2 px = v_texCoord * u_resolution;
  vec2 uv = v_texCoord;
  float gapMask = 0.0;

  // Cursor gravity: cells near the cursor are pushed radially outward,
  // leaving a small empty gap at the cursor centre
  if (u_mouse.x >= 0.0) {
    vec2 mousePx = u_mouse * u_resolution;
    vec2 d = px - mousePx;
    float r = length(d);
    float pushRadius = 40.0;
    float pushStrength = 15.33;
    float gapRadius = 5.33;
    if (r < pushRadius) {
      float t = 1.0 - r / pushRadius;
      float rSrc = max(0.0, r - pushStrength * t * t);
      vec2 srcPx = mousePx + (r > 0.0001 ? d / r : vec2(0.0)) * rSrc;
      uv = srcPx / u_resolution;
    }
    gapMask = 1.0 - smoothstep(gapRadius * 0.6, gapRadius, r);
  }

  // Click ripple: a displacement wave that travels across the whole screen
  if (u_rippleEnabled > 0.5) {
    float cellW = u_resolution.x / u_gridSize.x;
    vec2 rippleOffset = vec2(0.0);
    for (int i = 0; i < 8; i++) {
      vec4 ripple = u_ripples[i];
      if (ripple.w < 0.5) continue;
      float age = u_time - ripple.z;
      if (age < 0.0) continue;
      vec2 d = px - ripple.xy * u_resolution;
      float r = length(d);
      float front = (5.0 + age * u_rippleSpeed) * cellW;
      float width = 48.0;
      float x = (r - front) / width;
      float wave = exp(-x * x) * sin(x * 3.14159);
      float decay = 1.0 / (1.0 + age * 0.5);
      if (r > 0.0001) rippleOffset += (d / r) * wave * 14.0 * decay;
    }
    uv -= rippleOffset / u_resolution;
  }
  uv = clamp(uv, vec2(0.0), vec2(0.9999));

  // Figure out which ASCII cell this pixel is in
  vec2 cellCoord = floor(uv * u_gridSize);"""

OLD_CELLPOS = "vec2 cellPos = fract(v_texCoord * u_gridSize);"
NEW_CELLPOS = "vec2 cellPos = fract(uv * u_gridSize);"

OLD_OUT = "fragColor = vec4(blendedColor, 1.0);"
NEW_OUT = "blendedColor = mix(blendedColor, vec3(1.0), gapMask);\\n  fragColor = vec4(blendedColor, 1.0);"

NEW_MAIN = NEW_MAIN_GLSL.replace("\n", "\\n")

for name in ("index.mjs", "index.js"):
    p = ROOT / name
    s = p.read_text()
    for old, new in ((OLD_MAIN, NEW_MAIN), (OLD_CELLPOS, NEW_CELLPOS), (OLD_OUT, NEW_OUT)):
        assert s.count(old) == 1, (name, old[:40], s.count(old))
        s = s.replace(old, new)
    p.write_text(s)
    print("patched", name)

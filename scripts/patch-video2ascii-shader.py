"""Applies the cursor push / click ripple displacement to the video2ascii
fragment shader in node_modules. Run on a clean node_modules, then
`npx patch-package video2ascii`.
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
  float cellW = u_resolution.x / u_gridSize.x;

  // Cursor gravity: cells near the cursor are pushed radially outward,
  // with a suction pit at the cursor centre
  if (u_mouse.x >= 0.0) {
    vec2 mousePx = u_mouse * u_resolution;
    vec2 d = px - mousePx;
    float r = length(d);
    float pushRadius = 90.0;
    float pushStrength = 0.85;
    if (r < pushRadius) {
      float t = 1.0 - r / pushRadius;
      // Pull proportional to r, so the collapsed core stays about one cell
      // wide while the distortion field itself is wide
      float rSrc = r * (1.0 - pushStrength * t * t);
      vec2 srcPx = mousePx + (r > 0.0001 ? d / r : vec2(0.0)) * rSrc;
      // Where the push collapses onto the cursor, keep the cell's
      // own sample so the pit shows the background, not a solid disc
      float keep = smoothstep(0.0, cellW, rSrc);
      uv = mix(v_texCoord, srcPx / u_resolution, keep);
    }
  }

  // Click ripple: a displacement wave that travels across the whole screen
  if (u_rippleEnabled > 0.5) {
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

# The stock cursor glow + trail brighten cells around the cursor; removed so
# nothing highlights the pointer. (u_mouse/u_trail uniforms stay wired; unused.)
OLD_GLOW_GLSL = """  // Cursor glow - blocky circle effect
  float cursorGlow = 0.0;
  float cursorRadius = 5.0;
  
  vec2 mouseCell = floor(u_mouse * u_gridSize);
  float cellDist = length(thisCell - mouseCell);
  if (cellDist <= cursorRadius && u_mouse.x >= 0.0) {
    cursorGlow += 1.0 - cellDist / cursorRadius;
  }
  
  // Trail effect
  for (int i = 0; i < 12; i++) {
    if (i >= u_trailLength) break;
    vec2 trailPos = u_trail[i];
    if (trailPos.x < 0.0) continue;
    
    vec2 trailCell = floor(trailPos * u_gridSize);
    float trailDist = length(thisCell - trailCell);
    float trailRadius = cursorRadius * 0.8;
    
    if (trailDist <= trailRadius) {
      float fade = 1.0 - float(i) / float(u_trailLength);
      cursorGlow += (1.0 - trailDist / trailRadius) * 0.5 * fade;
    }
  }
  cursorGlow = min(cursorGlow, 1.0);
  
"""

OLD_CELLPOS = "vec2 cellPos = fract(v_texCoord * u_gridSize);"
NEW_CELLPOS = "vec2 cellPos = fract(uv * u_gridSize);"

OLD_OUT = "fragColor = vec4(blendedColor, 1.0);"
NEW_OUT = OLD_OUT

NEW_MAIN = NEW_MAIN_GLSL.replace("\n", "\\n")
OLD_GLOW = OLD_GLOW_GLSL.replace("\n", "\\n")
NEW_GLOW = ""
OLD_GLOW_ADD = "  // Add cursor and ripple glow\\n  finalColor += cursorGlow * baseColor * 0.5;\\n"
NEW_GLOW_ADD = "  // Add ripple glow\\n"

for name in ("index.mjs", "index.js"):
    p = ROOT / name
    s = p.read_text()
    for old, new in (
        (OLD_MAIN, NEW_MAIN),
        (OLD_GLOW, NEW_GLOW),
        (OLD_GLOW_ADD, NEW_GLOW_ADD),
        (OLD_CELLPOS, NEW_CELLPOS),
        (OLD_OUT, NEW_OUT),
    ):
        assert s.count(old) == 1, (name, old[:40], s.count(old))
        s = s.replace(old, new)
    p.write_text(s)
    print("patched", name)

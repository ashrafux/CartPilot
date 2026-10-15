/* "Mesh drift" shader background for the platform-page heroes: a vanilla WebGL port of the user's
   ShaderBackground React component (21st.dev Shader Builder, sakura palette). Usage:
     <div class="phero__bg" data-mesh aria-hidden="true"><canvas></canvas></div>
   Same uniforms as the component; in the shader the light blobs are smaller and kept to the sides (see shade()).
   Its cursor effect is switched off there, so the pointer code is left out (cursor presence stays 0). Pauses when off-screen or the tab is hidden;
   reduced motion gets one still frame. */
(() => {
  const VERT = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, paramA, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // hue, vignette, blur, grain
uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
uniform vec4 u_space;      // offset.xy, pointer.xy
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

// CartPilot tweak: the light blobs are ~half the original size (falloff 6 → 18) and fade out over the
// centre column, so the glow only ever drifts along the sides and never sits behind the copy or the mock.
vec3 shade(vec2 uv, vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.15;
  float total = 0.15;
  float side = smoothstep(0.2, 0.42, abs(uv.x - 0.5));
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_colorCount) break;
    float fi = float(i);
    vec2 c = vec2(
      sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),
      cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
    float w = exp(-dot(p - c, p - c) * 18.0);
    if (i > 0) w *= side;
    acc += u_colors[i] * w;
    total += w;
  }
  return acc / total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

  // Recipe values exactly as exported (sakura: plum, rose, blush, cream ×5)
  const CREAM = [1, 0.9607843137254902, 0.9215686274509803];
  const U = {
    colors: [[0.10196078431372549, 0.0784313725490196, 0.13725490196078433], [0.7176470588235294, 0.36470588235294116, 0.4117647058823529],
             [0.9176470588235294, 0.803921568627451, 0.7607843137254902], CREAM, CREAM, CREAM, CREAM, CREAM],
    colorCount: 4, scale: 1.16, intensity: 0.34, paramA: 0.5, warp: 0, detail: 2.4, contrast: 1.158, brightness: -0.18,
    saturation: 0.54, hue: 0, vignette: 0.55, blur: 0, grain: 0.059, seed: 1453, rotate: 0, offsetX: 0, offsetY: 0,
    drift: 0.4, cursorEffect: 2, cursorStrength: 0.65, cursorRadius: 0.46, oklab: 0, timeScale: 0.214,
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-mesh]").forEach((host) => {
    const canvas = host.querySelector("canvas") || host.appendChild(document.createElement("canvas"));
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;
    const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const program = gl.createProgram();
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(program, n);
    const uScene = u("u_scene");
    gl.uniform3fv(u("u_colors"), new Float32Array(U.colors.flat()));
    gl.uniform4f(u("u_shape"), U.scale, U.intensity, U.paramA, U.warp);
    gl.uniform4f(u("u_surface"), U.detail, U.contrast, U.brightness, U.saturation);
    gl.uniform4f(u("u_finish"), U.hue, U.vignette, U.blur, U.grain);
    gl.uniform4f(u("u_transform"), U.seed, U.rotate, U.drift, U.oklab);
    gl.uniform4f(u("u_space"), U.offsetX, U.offsetY, 0, 0);
    gl.uniform4f(u("u_cursor"), 0, U.cursorEffect, U.cursorStrength, U.cursorRadius);

    // Backing store: DPR capped at 2 and at ~2 MP, as in the component
    const resize = () => {
      const b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      const rw = Math.max(1, Math.round(b.width * dpr)), rh = Math.max(1, Math.round(b.height * dpr));
      const k = Math.min(1, Math.sqrt(2e6 / (rw * rh)));
      const w = Math.max(1, Math.round(rw * k)), h = Math.max(1, Math.round(rh * k));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };

    const start = performance.now();
    let raf = 0, inView = true, visible = document.visibilityState === "visible";
    const draw = (now) => {
      resize();
      gl.uniform4f(uScene, canvas.width, canvas.height, reduce ? 0 : ((now - start) / 1000) * U.timeScale, U.colorCount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now) => { raf = 0; if (!visible || !inView) return; draw(now); raf = requestAnimationFrame(loop); };
    const kick = () => { if (reduce) draw(performance.now()); else if (!raf && visible && inView) raf = requestAnimationFrame(loop); };
    const halt = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

    new ResizeObserver(() => (reduce ? draw(performance.now()) : kick())).observe(canvas);
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? kick() : halt(); }).observe(canvas);
    document.addEventListener("visibilitychange", () => { visible = document.visibilityState === "visible"; visible ? kick() : halt(); });
    kick();
  });
})();

/* Animated "mist" gradient for the dark hero — a vanilla WebGL port of the
   AnimatedGradient React component (variant "mist"). Usage:
     <div class="hero__bg" data-mist data-speed="0.6" data-opacity="0.8"
          data-color="#0054ff" data-highlight="#5b8cff" data-glow="#8db8ff"><canvas></canvas></div>
   Colours: data-color = mist body, data-highlight = bright folds, data-glow = light shafts + dust.
   The component's original pink is data-color="#ff66b8" with no data-highlight / data-glow
   (highlight then defaults to color × 1.15 and glow to color, exactly as in the component).
   Pauses when the hero is off-screen or the tab is hidden; reduced motion gets one still frame. */
(() => {
  const VERTEX = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() { v_uv = a_position * 0.5 + 0.5; gl_Position = vec4(a_position, 0.0, 1.0); }`;

  const MIST = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    varying vec2 v_uv;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec3 u_color;
    uniform vec3 u_hi;
    uniform vec3 u_glow;
    #define TWO_PI 6.28318530718
    #define PI 3.14159265358979323846
    float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
    float noise(vec2 st) {
      vec2 i = floor(st); vec2 f = fract(st);
      float a = random(i); float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    void main() {
      vec2 uv = v_uv;
      float t = u_time * 0.975 - 1.175;
      float noise_scale = 0.00338;
      uv -= 0.5; uv *= (noise_scale * u_resolution); uv /= 1.5; uv += 0.5;
      float n1 = noise(uv * 1.0 + t);
      float n2 = noise(uv * 2.0 - t);
      float angle = n1 * TWO_PI;
      uv.x += 0.32 * n2 * cos(angle);
      uv.y += 0.32 * n2 * sin(angle);
      for (int i = 1; i <= 5; i++) {
        float fi = float(i);
        uv.x += 0.65 / fi * cos(t + fi * 1.5 * uv.y);
        uv.y += 0.65 / fi * cos(t + fi * 1.0 * uv.x);
      }
      float sh = 1.0 - uv.y;
      sh -= 0.5; sh /= (noise_scale * u_resolution.y); sh += 0.5;
      float shape_scaling = 0.104;
      float mixer = smoothstep(0.45 - shape_scaling, 0.55 + shape_scaling, sh + 0.3 * (0.33 - 0.5));
      vec3 bg = vec3(0.0196, 0.0196, 0.0196);
      vec3 pink = u_color;
      float mistFocus = pow(sin(mixer * PI), 4.2);
      float fineMist = noise(uv * 3.5 - t * 1.3) * 0.4 + noise(uv * 1.5 + t * 0.85) * 0.6;
      float combinedDensity = mix(mixer, fineMist, 0.28) * mistFocus;
      vec3 col = mix(bg, pink, smoothstep(0.0, 0.85, combinedDensity));
      float highlight = smoothstep(0.42, 0.88, fineMist) * smoothstep(0.12, 0.9, mixer) * mistFocus;
      col = mix(col, u_hi, highlight * 0.35);
      vec2 raySource = vec2(0.2, 1.25);
      vec2 rayDir = normalize(v_uv - raySource);
      float rayAngle = atan(rayDir.y, rayDir.x);
      float rays = sin(rayAngle * 6.5 + t * 0.35) * 0.35 + sin(rayAngle * 12.0 - t * 0.22) * 0.25 + sin(rayAngle * 24.0 + t * 0.15) * 0.15;
      rays = smoothstep(0.15, 0.82, rays * 0.5 + 0.5);
      float rayGlow = rays * smoothstep(0.15, 0.9, combinedDensity) * (1.1 - v_uv.y) * mistFocus * 0.7;
      col += u_glow * rayGlow * 0.38;
      float grain = random(gl_FragCoord.xy * 0.15 + t * 0.05);
      float particles = step(0.988, grain) * smoothstep(0.2, 0.9, combinedDensity);
      col += u_glow * particles * 0.32;
      col = pow(col, vec3(0.92));
      gl_FragColor = vec4(col, 1.0);
    }`;

  document.querySelectorAll("[data-mist]").forEach((host) => {
    const canvas = host.querySelector("canvas");
    const gl = canvas && canvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) return;
    const speed = parseFloat(host.dataset.speed || "1");
    canvas.style.opacity = host.dataset.opacity || "1";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; }
      return s;
    };
    const vs = shader(gl.VERTEX_SHADER, VERTEX), fs = shader(gl.FRAGMENT_SHADER, MIST);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "u_time"), uRes = gl.getUniformLocation(prog, "u_resolution");
    const hex = (h) => { const n = parseInt(h.replace("#", ""), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
    const base = hex(host.dataset.color || "#ff66b8");
    const hi = host.dataset.highlight ? hex(host.dataset.highlight) : base.map((v) => v * 1.15);
    const glow = host.dataset.glow ? hex(host.dataset.glow) : base;
    gl.uniform3fv(gl.getUniformLocation(prog, "u_color"), base);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_hi"), hi);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_glow"), glow);

    /* The pattern scale follows u_resolution (CSS size × DPR, as in the component), but the
       backing store renders at 60% of that: the mist is soft, so this saves a lot of GPU. */
    let resW = 1, resH = 1;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      resW = canvas.clientWidth * dpr; resH = canvas.clientHeight * dpr;
      canvas.width = Math.max(1, Math.round(resW * 0.6)); canvas.height = Math.max(1, Math.round(resH * 0.6));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const start = performance.now();
    let raf = 0, visible = true;
    const draw = (now) => {
      gl.uniform1f(uTime, ((now - start) / 1000) * speed);
      gl.uniform2f(uRes, resW, resH);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = (now) => { draw(now); raf = requestAnimationFrame(loop); };
    const play = () => { cancelAnimationFrame(raf); if (reduce) draw(start + 2000); else if (visible && !document.hidden) raf = requestAnimationFrame(loop); };

    resize(); play();
    addEventListener("resize", () => { resize(); if (reduce) play(); });
    document.addEventListener("visibilitychange", play);
    new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; visible ? play() : cancelAnimationFrame(raf); }).observe(host);
  });
})();

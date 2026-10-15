import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Droplets, Sparkles, Wind, Eye } from 'lucide-react';

type FlowMode = 'gentle' | 'vivid' | 'tranquil';

interface RippleImpulse {
  x: number; // UV space (0 to 1)
  y: number; // UV space (0 to 1)
  radius: number;
  maxRadius: number;
  speed: number;
  intensity: number;
  decay: number;
}

// Fine-art watercolor palette for 3D shaders and particles
const PALETTE = {
  paperIvory: new THREE.Color(0xFBF9F5),
  paperWarm: new THREE.Color(0xF7F4EE),
  aqua: new THREE.Color(0x5CB9C6),
  turquoise: new THREE.Color(0x2A94A2),
  cyan: new THREE.Color(0x38A3A5),
  sky: new THREE.Color(0x6CA5D7),
  cobalt: new THREE.Color(0x2D5B88),
  teal: new THREE.Color(0x419885),
  sage: new THREE.Color(0x5F8A7A),
  amber: new THREE.Color(0xCE9E6E),
};

export const WatercolorWaterBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // User interactive mode
  const [mode, setMode] = useState<FlowMode>('gentle');
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Mouse, scroll, and animation tracking refs
  const stateRef = useRef({
    // Mouse coords normalized (-1 to 1 for 3D camera, 0 to 1 for UV texture)
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    mouseVelX: 0,
    mouseVelY: 0,
    mouseSpeed: 0,
    isDown: false,
    inWindow: false,
    lastMoveTime: 0,
    // Scroll progress (0.0 to 1.0)
    scrollProgress: 0,
    smoothScrollProgress: 0,
    // Mode multiplier
    modeIntensity: 1.0,
  });

  // Active 3D ripple impulses (max 6 tracked in shader uniform)
  const ripplesRef = useRef<RippleImpulse[]>([]);

  // Update mode intensity ref
  useEffect(() => {
    stateRef.current.modeIntensity = mode === 'vivid' ? 1.5 : mode === 'tranquil' ? 0.6 : 1.0;
  }, [mode]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Window scroll and mouse event listeners
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setTouchDevice(isTouch);

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const state = stateRef.current;
      const clientX = e.clientX;
      const clientY = e.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Normalized coordinates (-1 to 1 for camera parallax, 0 to 1 for UV)
      const normX = (clientX / width) * 2 - 1;
      const normY = -(clientY / height) * 2 + 1;

      state.mouseX = normX;
      state.mouseY = normY;
      state.inWindow = true;
      state.lastMoveTime = performance.now();
      setCursorActive(true);
    };

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      stateRef.current.isDown = true;
      const u = e.clientX / window.innerWidth;
      const v = 1.0 - e.clientY / window.innerHeight;
      spawnRipple(u, v, 1.4);
    };

    const handlePointerUp = () => {
      stateRef.current.isDown = false;
    };

    const handlePointerLeave = () => {
      stateRef.current.inWindow = false;
      setCursorActive(false);
    };

    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      stateRef.current.scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch as unknown as PointerEvent);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerDown(touch as unknown as PointerEvent);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Spawn an organic 3D ripple impulse in UV space
  const spawnRipple = (u: number, v: number, intensity: number = 1.0) => {
    ripplesRef.current.push({
      x: u,
      y: v,
      radius: 0.02,
      maxRadius: 0.35 * intensity,
      speed: 0.22 * (mode === 'vivid' ? 1.3 : 1.0),
      intensity: intensity * (mode === 'vivid' ? 1.35 : mode === 'tranquil' ? 0.7 : 1.0),
      decay: 0.85,
    });

    if (ripplesRef.current.length > 6) {
      ripplesRef.current.shift();
    }
  };

  // Three.js 3D Scene Initialization and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 1. Scene & 3D Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // 2. Offscreen 2D Watercolor Trail Canvas (for wet-on-wet pigment dispersion)
    const trailCanvas = document.createElement('canvas');
    trailCanvas.width = 512;
    trailCanvas.height = 512;
    const trailCtx = trailCanvas.getContext('2d');
    if (trailCtx) {
      trailCtx.fillStyle = '#000000';
      trailCtx.fillRect(0, 0, 512, 512);
    }
    const trailTexture = new THREE.CanvasTexture(trailCanvas);
    trailTexture.minFilter = THREE.LinearFilter;
    trailTexture.magFilter = THREE.LinearFilter;

    // 3. Custom GLSL Shader for 3D Water Surface Mesh
    const waterUniforms = {
      uTime: { value: 0 },
      uTrailMap: { value: trailTexture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseSpeed: { value: 0.0 },
      uScrollProgress: { value: 0.0 },
      uModeIntensity: { value: 1.0 },
      // 6 active ripple impulses: (x, y, radius, intensity)
      uRipples: {
        value: [
          new THREE.Vector4(0, 0, 0, 0),
          new THREE.Vector4(0, 0, 0, 0),
          new THREE.Vector4(0, 0, 0, 0),
          new THREE.Vector4(0, 0, 0, 0),
          new THREE.Vector4(0, 0, 0, 0),
          new THREE.Vector4(0, 0, 0, 0),
        ],
      },
      uPaperColor: { value: PALETTE.paperIvory },
      uAquaColor: { value: PALETTE.aqua },
      uTurquoiseColor: { value: PALETTE.turquoise },
      uCyanColor: { value: PALETTE.cyan },
      uSkyColor: { value: PALETTE.sky },
      uCobaltColor: { value: PALETTE.cobalt },
      uAmberColor: { value: PALETTE.amber },
    };

    // Vertex Shader: Procedural 3D multi-octave water waves + ripple displacement
    const waterVertexShader = `
      uniform float uTime;
      uniform float uScrollProgress;
      uniform float uModeIntensity;
      uniform vec4 uRipples[6];
      uniform sampler2D uTrailMap;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying float vElevation;

      // 2D Simplex Noise approximation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vUv = uv;

        // Base undulating 3D watercolor waves
        float t = uTime * 0.45;
        float wave1 = sin(uv.x * 4.0 + uv.y * 3.0 + t) * 0.06;
        float wave2 = cos(uv.x * 7.0 - uv.y * 5.0 + t * 0.8) * 0.035;
        float noiseWave = snoise(uv * 3.0 + vec2(t * 0.2, t * 0.15)) * 0.05;

        float elevation = (wave1 + wave2 + noiseWave) * uModeIntensity;

        // Mouse-driven 3D ripples
        for (int i = 0; i < 6; i++) {
          if (uRipples[i].w > 0.005) {
            float dist = distance(uv, uRipples[i].xy);
            float r = uRipples[i].z;
            float rip = sin((dist - r) * 38.0) * exp(-abs(dist - r) * 14.0) * uRipples[i].w;
            elevation += rip * 0.14;
          }
        }

        // Wet paint trail swelling paper
        vec4 trailSample = texture2D(uTrailMap, uv);
        elevation += trailSample.r * 0.06 * uModeIntensity;

        vElevation = elevation;

        vec3 newPosition = position;
        newPosition.z += elevation;

        // Compute displaced normal for subtle specular lighting
        vec3 displacedNormal = normalize(normal + vec3(
          -cos(uv.x * 5.0 + t) * 0.1,
          -sin(uv.y * 4.0 + t) * 0.1,
          1.0
        ));
        vNormal = normalMatrix * displacedNormal;

        vec4 worldPos = modelMatrix * vec4(newPosition, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    // Fragment Shader: Light-themed living watercolor painting with caustics, soft pigments, and paper bleed
    const waterFragmentShader = `
      uniform float uTime;
      uniform float uModeIntensity;
      uniform sampler2D uTrailMap;
      uniform vec2 uMouse;
      uniform float uMouseSpeed;
      uniform vec3 uPaperColor;
      uniform vec3 uAquaColor;
      uniform vec3 uTurquoiseColor;
      uniform vec3 uCyanColor;
      uniform vec3 uSkyColor;
      uniform vec3 uCobaltColor;
      uniform vec3 uAmberColor;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying float vElevation;

      // Voronoi Caustics function for soft moving sunlight in water
      float voronoi(vec2 p) {
        vec2 g = floor(p);
        vec2 f = fract(p);
        float res = 1.0;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 lattice = vec2(float(x), float(y));
            vec2 offset = sin(lattice + vec2(uTime * 0.6, uTime * 0.45)) * 0.4 + 0.5;
            float d = distance(lattice + offset, f);
            res = min(res, d);
          }
        }
        return res;
      }

      void main() {
        vec2 uv = vUv;

        // 1. Organic Ambient Watercolor Meandering Rivers
        float stream1 = sin(uv.x * 2.8 + uv.y * 1.8 + uTime * 0.3) * 0.5 + 0.5;
        float stream2 = cos(uv.x * 4.2 - uv.y * 3.1 + uTime * 0.22) * 0.5 + 0.5;
        float streamBlend = smoothstep(0.2, 0.8, (stream1 + stream2) * 0.5);

        // Gradient color transitions across the water landscape
        vec3 ambientWater = mix(uAquaColor, uTurquoiseColor, streamBlend);
        ambientWater = mix(ambientWater, uSkyColor, uv.x * 0.6 + uv.y * 0.4);
        ambientWater = mix(ambientWater, uCobaltColor, smoothstep(0.55, 0.95, stream1 * stream2));

        // Subtle amber warm wash along the riverbanks
        float amberFringe = smoothstep(0.3, 0.45, abs(stream1 - 0.5));
        ambientWater = mix(ambientWater, uAmberColor, amberFringe * 0.12);

        // 2. Mouse-reactive Wet-on-Wet Paint Trail
        vec4 trail = texture2D(uTrailMap, uv);
        float trailIntensity = (trail.r + trail.g * 0.6) * uModeIntensity;
        vec3 reactivePigment = mix(uTurquoiseColor, uCyanColor, sin(uTime * 2.0 + uv.x * 5.0) * 0.5 + 0.5);
        reactivePigment = mix(reactivePigment, uCobaltColor, trail.g);

        // 3. Soft Caustic Sunlight Rays & Reflections
        vec2 causticUv = uv * 6.0 + vec2(sin(uTime * 0.3), cos(uTime * 0.25)) * 0.4;
        float caust = pow(1.0 - voronoi(causticUv), 2.5);
        float causticHighlight = caust * 0.14 * (0.6 + vElevation * 1.5);

        // 4. Subtle Specular Highlight
        vec3 lightDir = normalize(vec3(0.3, 0.6, 0.9));
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(vNormal, halfDir), 0.0), 24.0) * 0.15;

        // 5. Watercolor Blending onto Paper (Translucent pigment washes)
        float waterOpacity = (0.08 + streamBlend * 0.16 + trailIntensity * 0.4) * uModeIntensity;
        waterOpacity = clamp(waterOpacity, 0.0, 0.65);

        // Blend ambient water with reactive pigment
        vec3 waterColor = mix(ambientWater, reactivePigment, clamp(trailIntensity * 1.3, 0.0, 1.0));

        // Add soft caustics and highlights to water
        waterColor += vec3(causticHighlight + spec);

        // Blend onto warm ivory paper with realistic watercolor multiply effect
        vec3 finalColor = mix(uPaperColor, waterColor * uPaperColor * 1.08, waterOpacity);

        // Fine cold-press watercolor paper grain
        float grain = fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += (grain - 0.5) * 0.012;

        gl_FragColor = vec4(finalColor, waterOpacity + 0.04);
      }
    `;

    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: waterUniforms,
      transparent: true,
      depthWrite: false,
    });

    // Main 3D Water Surface Mesh (Plane with 96x72 resolution for smooth wave undulation)
    const waterGeometry = new THREE.PlaneGeometry(16, 12, 96, 72);
    const waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
    waterMesh.position.set(0, 0, 0);
    scene.add(waterMesh);

    // 4. Distant 3D Background Wash Layer (At z = -3.0 for layered spatial depth)
    const bgWashGeo = new THREE.PlaneGeometry(24, 18);
    const bgWashMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uCobalt: { value: PALETTE.cobalt },
        uAmber: { value: PALETTE.amber },
        uSage: { value: PALETTE.sage },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uCobalt;
        uniform vec3 uAmber;
        uniform vec3 uSage;
        varying vec2 vUv;

        void main() {
          float dist1 = distance(vUv, vec2(0.3 + sin(uTime * 0.1) * 0.08, 0.7));
          float wash1 = smoothstep(0.65, 0.0, dist1) * 0.09;

          float dist2 = distance(vUv, vec2(0.8, 0.2 + cos(uTime * 0.12) * 0.06));
          float wash2 = smoothstep(0.55, 0.0, dist2) * 0.07;

          float dist3 = distance(vUv, vec2(0.15, 0.25));
          float wash3 = smoothstep(0.5, 0.0, dist3) * 0.06;

          vec3 col = uCobalt * wash1 + uAmber * wash2 + uSage * wash3;
          gl_FragColor = vec4(col, wash1 + wash2 + wash3);
        }
      `,
    });
    const bgWashMesh = new THREE.Mesh(bgWashGeo, bgWashMat);
    bgWashMesh.position.set(0, 0, -3.2);
    scene.add(bgWashMesh);

    // 5. Floating 3D Watercolor Pigment Droplets (Spatial stereoscopic depth at z = -0.5 to 2.5)
    const particleCount = 130;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const seeds = new Float32Array(particleCount);

    const paletteArray = [
      PALETTE.aqua,
      PALETTE.turquoise,
      PALETTE.cyan,
      PALETTE.sky,
      PALETTE.cobalt,
      PALETTE.teal,
      PALETTE.amber,
    ];

    for (let i = 0; i < particleCount; i++) {
      // Distributed in 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.5 + 0.8; // z between -1.0 and 2.5

      const c = paletteArray[Math.floor(Math.random() * paletteArray.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 18.0 + Math.random() * 32.0;
      seeds[i] = Math.random() * 100.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    // Shader for soft translucent watercolor particle dabs
    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      vertexShader: `
        attribute float size;
        attribute float seed;
        varying vec3 vColor;
        varying float vSeed;

        void main() {
          vColor = color;
          vSeed = seed;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSeed;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          // Soft watercolor bleed edge
          float alpha = smoothstep(0.5, 0.0, dist) * 0.35;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      vertexColors: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Clock & State Tracking
    const clock = new THREE.Clock();
    let animId: number;

    // Track last trail paint point
    let lastTrailU = 0.5;
    let lastTrailV = 0.5;

    // Main 60 FPS Render Loop
    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsedTime = clock.getElapsedTime();
      const state = stateRef.current;

      // 1. Smooth Pointer Interpolation (Exponential Damping)
      const lerpSpeed = 0.12;
      const prevSmoothX = state.smoothMouseX;
      const prevSmoothY = state.smoothMouseY;

      state.smoothMouseX += (state.mouseX - state.smoothMouseX) * lerpSpeed;
      state.smoothMouseY += (state.mouseY - state.smoothMouseY) * lerpSpeed;

      state.mouseVelX = state.smoothMouseX - prevSmoothX;
      state.mouseVelY = state.smoothMouseY - prevSmoothY;
      state.mouseSpeed = Math.hypot(state.mouseVelX, state.mouseVelY);

      // Smooth scroll progress interpolation
      state.smoothScrollProgress +=
        (state.scrollProgress - state.smoothScrollProgress) * 0.08;

      // 2. 3D Camera Parallax & Viewpoint Motion
      if (!reducedMotion) {
        // Horizontal & vertical parallax based on mouse position
        const targetCamX = state.smoothMouseX * 0.75;
        // Scroll links camera vertically through the 3D scene
        const targetCamY =
          state.smoothMouseY * 0.5 - state.smoothScrollProgress * 3.5;
        const targetCamZ = 7.5 + state.smoothScrollProgress * 0.6;

        camera.position.x += (targetCamX - camera.position.x) * 0.06;
        camera.position.y += (targetCamY - camera.position.y) * 0.06;
        camera.position.z += (targetCamZ - camera.position.z) * 0.06;

        // Subtle 3D tilt look-at
        camera.rotation.y = -state.smoothMouseX * 0.08;
        camera.rotation.x = state.smoothMouseY * 0.06;
      }

      // Parallax for distant background wash layer
      bgWashMesh.position.x = -state.smoothMouseX * 0.4;
      bgWashMesh.position.y =
        -state.smoothMouseY * 0.3 + state.smoothScrollProgress * 1.5;

      // 3. Update Offscreen 2D Watercolor Trail Map (fades smoothly like wet paper)
      if (trailCtx) {
        // Slow diffusion fade
        trailCtx.fillStyle = 'rgba(0, 0, 0, 0.035)';
        trailCtx.fillRect(0, 0, 512, 512);

        // When mouse moves in window, paint wet pigment
        if (state.inWindow && state.mouseSpeed > 0.002) {
          const curU = (state.smoothMouseX + 1.0) * 0.5;
          const curV = (state.smoothMouseY + 1.0) * 0.5;

          const pxX = curU * 512;
          const pxY = (1.0 - curV) * 512;
          const lastPxX = lastTrailU * 512;
          const lastPxY = (1.0 - lastTrailV) * 512;

          const speedScale = Math.min(state.mouseSpeed * 30.0, 1.0);
          const brushRadius = Math.max(12, (1.0 - speedScale * 0.5) * 28);

          // Draw soft wet brush dab
          const grad = trailCtx.createRadialGradient(
            pxX,
            pxY,
            0,
            pxX,
            pxY,
            brushRadius
          );
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
          grad.addColorStop(0.5, 'rgba(180, 230, 240, 0.3)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          trailCtx.fillStyle = grad;
          trailCtx.beginPath();
          trailCtx.arc(pxX, pxY, brushRadius, 0, Math.PI * 2);
          trailCtx.fill();

          // Connect stroke ribbon between frames
          trailCtx.strokeStyle = 'rgba(200, 240, 255, 0.25)';
          trailCtx.lineWidth = brushRadius * 1.2;
          trailCtx.lineCap = 'round';
          trailCtx.beginPath();
          trailCtx.moveTo(lastPxX, lastPxY);
          trailCtx.lineTo(pxX, pxY);
          trailCtx.stroke();

          lastTrailU = curU;
          lastTrailV = curV;

          // Periodically spawn 3D wave ripples along cursor trajectory
          if (Math.random() < 0.25 && state.mouseSpeed > 0.015) {
            spawnRipple(curU, curV, 0.9 + speedScale * 0.5);
          }
        }

        trailTexture.needsUpdate = true;
      }

      // 4. Update 3D Ripple Impulses
      const activeRipples = ripplesRef.current;
      for (let i = activeRipples.length - 1; i >= 0; i--) {
        const rip = activeRipples[i];
        rip.radius += rip.speed * dt;
        rip.intensity *= Math.pow(rip.decay, dt * 10.0);

        if (rip.radius > rip.maxRadius || rip.intensity < 0.01) {
          activeRipples.splice(i, 1);
        }
      }

      // Pass ripples to shader uniforms
      const rippleVectors = waterUniforms.uRipples.value;
      for (let i = 0; i < 6; i++) {
        if (i < activeRipples.length) {
          const r = activeRipples[i];
          rippleVectors[i].set(r.x, r.y, r.radius, r.intensity);
        } else {
          rippleVectors[i].set(0, 0, 0, 0);
        }
      }

      // 5. Update Floating 3D Watercolor Particles (Fluid Vector Field)
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const seed = seeds[i];

        // Fluid undulating drift
        posArray[idx] +=
          Math.sin(elapsedTime * 0.4 + seed) * dt * 0.25 +
          state.mouseVelX * 0.4 * (posArray[idx + 2] * 0.3);
        posArray[idx + 1] +=
          Math.cos(elapsedTime * 0.3 + seed * 1.5) * dt * 0.2 +
          state.mouseVelY * 0.4 * (posArray[idx + 2] * 0.3);

        // Keep inside bounds
        if (posArray[idx] > 7.5) posArray[idx] = -7.5;
        if (posArray[idx] < -7.5) posArray[idx] = 7.5;
        if (posArray[idx + 1] > 5.5) posArray[idx + 1] = -5.5;
        if (posArray[idx + 1] < -5.5) posArray[idx + 1] = 5.5;
      }
      posAttr.needsUpdate = true;

      // 6. Update Shader Uniforms
      waterUniforms.uTime.value = elapsedTime;
      waterUniforms.uMouse.value.set(
        (state.smoothMouseX + 1.0) * 0.5,
        (state.smoothMouseY + 1.0) * 0.5
      );
      waterUniforms.uMouseSpeed.value = state.mouseSpeed;
      waterUniforms.uScrollProgress.value = state.smoothScrollProgress;
      waterUniforms.uModeIntensity.value = state.modeIntensity;
      bgWashMat.uniforms.uTime.value = elapsedTime;

      // 7. Render 3D Scene
      renderer.render(scene, camera);

      animId = requestAnimationFrame(render);
    };

    // Pause when page is hidden (Page Visibility API)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        clock.start();
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animId = requestAnimationFrame(render);

    // Clean disposal of Three.js resources on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);

      waterGeometry.dispose();
      waterMaterial.dispose();
      bgWashGeo.dispose();
      bgWashMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      trailTexture.dispose();
      renderer.dispose();
    };
  }, [mode, reducedMotion]);

  return (
    <>
      {/* 1. Base Layer: Real 3D Interactive Three.js Watercolor Scene (Fixed behind content at z-0) */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Warm Ivory Cotton Paper Base with Authentic Fiber Grain */}
        <div
          className="absolute inset-0 bg-[#F7F4EE]"
          style={{
            backgroundImage: `
              radial-gradient(rgba(110, 75, 45, 0.04) 1px, transparent 1px),
              radial-gradient(rgba(45, 91, 136, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 48px 48px',
          }}
        />

        {/* Real-time 3D WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{
            filter: 'contrast(102%) brightness(99%)',
          }}
        />

        {/* Fallback if WebGL unavailable */}
        {!webglSupported && (
          <div className="absolute inset-0 bg-[#FBF9F5] flex items-center justify-center text-xs font-mono text-[#575D65]">
            Lightweight Watercolor Mode Active
          </div>
        )}

        {/* Soft Vignette & Paper Deckle Edge Shadow */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_90px_rgba(70,50,30,0.035)]" />
      </div>

      {/* 2. Painterly 3D Status & Fluid Flow Controls (Accessible floating badge) */}
      <aside
        aria-label="3D watercolor canvas settings"
        className="pointer-events-auto fixed bottom-5 left-5 z-[45] flex items-center"
      >
        {!isControlsOpen ? (
          <button
            onClick={() => setIsControlsOpen(true)}
            className="group flex items-center gap-2.5 px-3.5 py-2 bg-[#FBF9F5]/90 hover:bg-[#FFFFFF] border border-[#E5DFD3] hover:border-[#2D5B88]/40 rounded-full shadow-paper backdrop-blur-md transition-all text-xs font-mono text-[#575D65] hover:text-[#1A1D20] cursor-pointer"
            title="3D Interactive Watercolor Controls"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  cursorActive ? 'bg-[#2E9BA8]' : 'bg-[#2D5B88]'
                }`}
              />
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Droplets className="w-3.5 h-3.5 text-[#2E9BA8]" />
              <span className="hidden sm:inline">3D Water Flow:</span>
              <span className="text-[#2D5B88] capitalize font-semibold">{mode}</span>
            </span>
          </button>
        ) : (
          <div className="flex flex-col gap-2 p-3 bg-[#FBF9F5]/95 border border-[#E5DFD3] rounded-2xl shadow-paper-elevated backdrop-blur-md text-xs">
            <div className="flex items-center justify-between gap-4 pb-1.5 border-b border-[#EFEAE0]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#1A1D20]">
                <Droplets className="w-3.5 h-3.5 text-[#2E9BA8]" />
                <span>3D WATERCOLOR CANVAS</span>
              </div>
              <button
                onClick={() => setIsControlsOpen(false)}
                className="text-[#858D98] hover:text-[#1A1D20] text-xs font-mono px-1.5 py-0.5 rounded hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                aria-label="Close watercolor controls"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-[#575D65] max-w-[220px] leading-relaxed">
              Real-time 3D watercolor painting with fluid wave displacement, caustic lighting, and mouse-reactive pigment flow.
            </p>

            {/* Mode selection buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              {(['gentle', 'vivid', 'tranquil'] as FlowMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all capitalize cursor-pointer ${
                    mode === m
                      ? 'bg-[#2D5B88] text-white shadow-xs font-semibold'
                      : 'bg-[#EFEAE0]/70 hover:bg-[#EFEAE0] text-[#575D65] hover:text-[#1A1D20]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-[#858D98] font-mono flex items-center justify-between pt-1">
              <span>{touchDevice ? 'Touch & Drag 3D' : 'Move cursor across page'}</span>
              <span className="text-[#2D5B88] font-semibold">60 FPS 3D</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

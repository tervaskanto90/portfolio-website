"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { palettes } from "@/lib/content";

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uRes;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(7.3, 1.9);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp;
  vec2 m = (uMouse - 0.5) * asp;
  float t = uTime * 0.06;

  // cursor influence: a soft brush that warps the paint around it
  float md = length(p - m);
  float brush = exp(-md * md * 5.0);

  // domain-warped fbm for the painted texture
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t * 0.6 + 4.2));
  q += brush * 0.55 * vec2(sin(uTime * 0.4), cos(uTime * 0.3));
  vec2 r = vec2(
    fbm(p * 1.9 + q * 1.7 + vec2(1.7, 9.2) + t * 0.4),
    fbm(p * 1.9 + q * 1.7 + vec2(8.3, 2.8) - t * 0.3)
  );
  float f = fbm(p * 1.5 + r * 1.6);

  vec3 col = uColorA;
  col = mix(col, uColorB, smoothstep(0.15, 0.85, f));
  col = mix(col, uColorC, smoothstep(0.35, 0.95, r.x * f * 1.7) * 0.85);
  col += uColorC * brush * 0.22;

  // brush strokes: directional streaks layered on top
  float streak = noise(vec2(p.x * 6.0 + r.y * 4.0, p.y * 60.0));
  col += (streak - 0.5) * 0.035;

  // film grain + vignette
  col += (hash(vUv * uRes + fract(uTime) * 100.0) - 0.5) * 0.05;
  col *= 1.0 - dot(p * 0.55, p * 0.55);

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

export default function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const targets = palettes.map((p) => p.map(hexToVec3));
    const current = targets[0].map((v) => v.clone());

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColorA: { value: current[0] },
      uColorB: { value: current[1] },
      uColorC: { value: current[2] },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const mouse = new THREE.Vector2(0.5, 0.5);
    const onPointer = (e: PointerEvent) => {
      mouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Which palette is active is driven by whichever [data-chapter] section
    // currently crosses the middle of the viewport.
    const paletteTarget = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
      const mid = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      sections.forEach((el) => {
        if (el.offsetTop <= mid) idx = Number(el.dataset.chapter ?? 0);
      });
      return targets[Math.min(idx, targets.length - 1)];
    };

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(mouse, 0.045);
      const target = paletteTarget();
      current.forEach((c, i) => c.lerp(target[i], 0.022));
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="fluid-canvas" aria-hidden="true" />;
}

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const simulationFragment = `
  uniform sampler2D uState;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uImpulse;
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 px = 1.0 / uResolution;
    vec2 state = texture2D(uState, vUv).rg;
    float hL = texture2D(uState, vUv - vec2(px.x, 0.0)).r;
    float hR = texture2D(uState, vUv + vec2(px.x, 0.0)).r;
    float hD = texture2D(uState, vUv - vec2(0.0, px.y)).r;
    float hU = texture2D(uState, vUv + vec2(0.0, px.y)).r;
    float laplacian = hL + hR + hD + hU - 4.0 * state.r;

    float velocity = (state.g + laplacian * 0.155) * 0.982;
    float height = (state.r + velocity) * 0.996;
    float d = distance(vUv, uMouse);
    float ring = exp(-d * d * 1500.0) * (0.72 + 0.28 * sin(uTime * 2.0));
    height += ring * uImpulse;
    gl_FragColor = vec4(height, velocity, hash(vUv + uTime) * 0.001, 1.0);
  }
`;

const displayFragment = `
  uniform sampler2D uImage;
  uniform sampler2D uState;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uImageAspect;
  uniform float uViewAspect;
  varying vec2 vUv;

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = fract(sin(dot(i, vec2(127.1,311.7))) * 43758.5453);
    float b = fract(sin(dot(i + vec2(1.0,0.0), vec2(127.1,311.7))) * 43758.5453);
    float c = fract(sin(dot(i + vec2(0.0,1.0), vec2(127.1,311.7))) * 43758.5453);
    float d = fract(sin(dot(i + vec2(1.0,1.0), vec2(127.1,311.7))) * 43758.5453);
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
  }

  vec2 coverUv(vec2 uv) {
    vec2 ratio = vec2(min(uViewAspect / uImageAspect, 1.0), min(uImageAspect / uViewAspect, 1.0));
    return (uv - 0.5) * ratio + 0.5;
  }

  void main() {
    vec2 px = 1.0 / uResolution;
    float hL = texture2D(uState, vUv - vec2(px.x,0.0)).r;
    float hR = texture2D(uState, vUv + vec2(px.x,0.0)).r;
    float hD = texture2D(uState, vUv - vec2(0.0,px.y)).r;
    float hU = texture2D(uState, vUv + vec2(0.0,px.y)).r;
    vec3 normal = normalize(vec3((hL-hR)*8.0, (hD-hU)*8.0, 1.0));
    float idleFlow = (noise(vUv * 3.2 + vec2(uTime * 0.025,0.0)) - 0.5) * 0.0008;
    vec2 refractOffset = normal.xy * 0.026 + idleFlow;
    vec2 uv = coverUv(vUv + refractOffset);
    float aberration = clamp(length(normal.xy) * 0.006, 0.0, 0.004);
    float r = texture2D(uImage, uv + normal.xy * aberration).r;
    float g = texture2D(uImage, uv).g;
    float b = texture2D(uImage, uv - normal.xy * aberration).b;
    vec3 color = vec3(r,g,b);
    float fresnel = pow(1.0 - max(normal.z,0.0), 2.2);
    float specular = pow(max(dot(normal, normalize(vec3(-0.35,0.45,0.82))),0.0), 24.0);
    color += vec3(0.35,0.52,0.72) * fresnel * 0.32;
    color += vec3(0.88,0.74,0.56) * specular * 0.22;
    color += smoothstep(0.55,1.0,specular) * 0.08;
    gl_FragColor = vec4(color,1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }
`;

export default function WaterRippleImage() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch {
      element.classList.add("webgl-fallback");
      return;
    }

    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.prepend(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const size = matchMedia("(max-width: 800px)").matches ? 256 : 448;
    const targetOptions: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };
    let read = new THREE.WebGLRenderTarget(size, size, targetOptions);
    let write = new THREE.WebGLRenderTarget(size, size, targetOptions);
    renderer.setRenderTarget(read); renderer.setClearColor(0x000000, 1); renderer.clear();
    renderer.setRenderTarget(write); renderer.clear(); renderer.setRenderTarget(null);

    const mouse = new THREE.Vector2(-2, -2);
    const simulation = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: simulationFragment,
      uniforms: {
        uState: { value: read.texture },
        uResolution: { value: new THREE.Vector2(size, size) },
        uMouse: { value: mouse },
        uImpulse: { value: 0 },
        uTime: { value: 0 },
      },
    });
    const simScene = new THREE.Scene();
    simScene.add(new THREE.Mesh(geometry, simulation));

    const image = new THREE.TextureLoader().load("/royal-circle-interior.png");
    image.colorSpace = THREE.SRGBColorSpace;
    image.minFilter = THREE.LinearFilter;
    const display = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayFragment,
      uniforms: {
        uImage: { value: image },
        uState: { value: read.texture },
        uResolution: { value: new THREE.Vector2(size, size) },
        uTime: { value: 0 },
        uImageAspect: { value: 1.866 },
        uViewAspect: { value: 1 },
      },
    });
    const displayScene = new THREE.Scene();
    displayScene.add(new THREE.Mesh(geometry, display));

    let impulse = 0;
    let frame = 0;
    const clock = new THREE.Clock();
    const resize = () => {
      const rect = element.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      display.uniforms.uViewAspect.value = rect.width / Math.max(rect.height, 1);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();

    const disturb = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      mouse.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
      impulse = Math.min(0.085, impulse + 0.045);
    };
    const leave = () => mouse.set(-2, -2);
    element.addEventListener("pointermove", disturb, { passive: true });
    element.addEventListener("pointerdown", disturb, { passive: true });
    element.addEventListener("pointerleave", leave);

    const animate = () => {
      const time = clock.getElapsedTime();
      simulation.uniforms.uState.value = read.texture;
      simulation.uniforms.uMouse.value = mouse;
      simulation.uniforms.uImpulse.value = impulse;
      simulation.uniforms.uTime.value = time;
      renderer.setRenderTarget(write);
      renderer.render(simScene, camera);
      [read, write] = [write, read];
      impulse *= 0.84;

      display.uniforms.uState.value = read.texture;
      display.uniforms.uTime.value = time;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);
      frame = requestAnimationFrame(animate);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frame === 0) animate();
      if (!entry.isIntersecting && frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "120px" });
    visibilityObserver.observe(element);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
      element.removeEventListener("pointermove", disturb);
      element.removeEventListener("pointerdown", disturb);
      element.removeEventListener("pointerleave", leave);
      geometry.dispose(); simulation.dispose(); display.dispose(); image.dispose();
      read.dispose(); write.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={host} className="hero-bridge-image water-ripple" role="img" aria-label="A contemporary royal private salon shaped by Indian architectural heritage">
      <span>Legacy, made spatial.</span>
    </div>
  );
}

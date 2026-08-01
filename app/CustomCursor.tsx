"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const lens = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const lensNode = lens.current;
    const haloNode = halo.current;
    if (!lensNode || !haloNode) return;

    document.documentElement.classList.add("custom-cursor-active");
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let lensX = targetX;
    let lensY = targetY;
    let haloX = targetX;
    let haloY = targetY;
    let visible = false;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        lensNode.classList.add("visible");
        haloNode.classList.add("visible");
      }
      const interactive = (event.target as Element | null)?.closest("a,button,input,textarea,label,[role='button']");
      lensNode.classList.toggle("interactive", Boolean(interactive));
      haloNode.classList.toggle("interactive", Boolean(interactive));
    };
    const leave = () => {
      visible = false;
      lensNode.classList.remove("visible", "interactive");
      haloNode.classList.remove("visible", "interactive");
    };
    const enter = () => { visible = true; };
    const render = () => {
      lensX += (targetX - lensX) * .28;
      lensY += (targetY - lensY) * .28;
      haloX += (targetX - haloX) * .105;
      haloY += (targetY - haloY) * .105;
      lensNode.style.transform = `translate3d(${lensX}px,${lensY}px,0) translate(-50%,-50%)`;
      haloNode.style.transform = `translate3d(${haloX}px,${haloY}px,0) translate(-50%,-50%)`;
      frame = requestAnimationFrame(render);
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    render();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div className="cursor-system" aria-hidden="true">
      <div ref={halo} className="cursor-halo" />
      <div ref={lens} className="cursor-lens"><i /></div>
    </div>
  );
}

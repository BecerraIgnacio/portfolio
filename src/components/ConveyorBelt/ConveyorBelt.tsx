"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";
import styles from "./ConveyorBelt.module.css";

const EASE_DURATION = 800;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ConveyorBelt({
  children,
  speed,
}: {
  children: ReactNode;
  speed: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<{
    offset: number;
    currentSpeed: number;
    targetSpeed: number;
    easeStart: number | null;
    easeFrom: number;
    halfWidth: number;
    rafId: number;
    isDragging: boolean;
    dragStartX: number;
    dragStartOffset: number;
  }>({
    offset: 0,
    currentSpeed: speed,
    targetSpeed: speed,
    easeStart: null,
    easeFrom: speed,
    halfWidth: 0,
    rafId: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
  });

  const tick = useCallback(
    (now: number) => {
      const state = animRef.current;
      const belt = beltRef.current;
      if (!belt) return;

      // Ease between speeds
      if (state.easeStart !== null) {
        const elapsed = now - state.easeStart;
        const t = Math.min(elapsed / EASE_DURATION, 1);
        state.currentSpeed =
          state.easeFrom +
          (state.targetSpeed - state.easeFrom) * easeInOutCubic(t);
        if (t >= 1) state.easeStart = null;
      }

      // Don't auto-scroll while dragging
      if (!state.isDragging) {
        state.offset -= state.currentSpeed;
      }

      if (state.halfWidth > 0 && Math.abs(state.offset) >= state.halfWidth) {
        state.offset += state.halfWidth;
      }

      belt.style.transform = `translateX(${state.offset}px)`;
      state.rafId = requestAnimationFrame(tick);
    },
    [speed]
  );

  useEffect(() => {
    const belt = beltRef.current;
    const track = trackRef.current;
    if (!belt || !track) return;

    // Measure half width after DOM paint
    const measureWidth = () => {
      animRef.current.halfWidth = belt.scrollWidth / 2;
    };
    measureWidth();
    window.addEventListener("resize", measureWidth);

    // Hover handlers
    const onEnter = () => {
      if (animRef.current.isDragging) return;
      const s = animRef.current;
      s.easeFrom = s.currentSpeed;
      s.targetSpeed = 0;
      s.easeStart = performance.now();
    };
    const onLeave = () => {
      if (animRef.current.isDragging) return;
      const s = animRef.current;
      s.easeFrom = s.currentSpeed;
      s.targetSpeed = speed;
      s.easeStart = performance.now();
    };

    // Drag handlers
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) return;
      const s = animRef.current;
      s.isDragging = true;
      s.dragStartX = e.pageX;
      s.dragStartOffset = s.offset;
      s.currentSpeed = 0;
      s.targetSpeed = 0;
      s.easeStart = null;
      track.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      const s = animRef.current;
      if (!s.isDragging) return;
      e.preventDefault();
      const dx = e.pageX - s.dragStartX;
      s.offset = s.dragStartOffset + dx;
    };
    const onMouseUp = () => {
      const s = animRef.current;
      if (!s.isDragging) return;
      s.isDragging = false;
      track.style.cursor = "";
      // Resume belt
      s.easeFrom = 0;
      s.targetSpeed = speed;
      s.easeStart = performance.now();
    };

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Start animation
    animRef.current.rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current.rafId);
      window.removeEventListener("resize", measureWidth);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [speed, tick]);

  return (
    <div ref={trackRef} className={styles.track}>
      <div ref={beltRef} className={styles.packages}>
        {children}
        {/* Duplicate for infinite loop */}
        <div aria-hidden="true" style={{ display: "contents" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

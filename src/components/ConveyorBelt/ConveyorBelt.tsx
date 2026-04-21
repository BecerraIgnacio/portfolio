"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";
import styles from "./ConveyorBelt.module.css";

const EASE_DURATION = 800;
const FRICTION = 0.95;
const MIN_VELOCITY = 0.1;

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
    dragVelocity: number;
    lastDragX: number;
    lastDragTime: number;
    isMomentum: boolean;
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
    dragVelocity: 0,
    lastDragX: 0,
    lastDragTime: 0,
    isMomentum: false,
  });

  const wrapOffset = (offset: number, half: number): number => {
    if (half <= 0) return offset;
    // Normalize offset into [-halfWidth, 0) range
    const mod = ((offset % half) + half) % half;
    return mod - half;
  };

  const tick = useCallback(
    (now: number) => {
      const state = animRef.current;
      const belt = beltRef.current;
      if (!belt) return;

      if (state.isMomentum) {
        // Apply drag momentum with friction
        state.offset += state.dragVelocity;
        state.dragVelocity *= FRICTION;

        if (Math.abs(state.dragVelocity) < MIN_VELOCITY) {
          state.isMomentum = false;
          // Ease back to belt speed
          state.easeFrom = 0;
          state.targetSpeed = speed;
          state.easeStart = performance.now();
        }
      } else if (!state.isDragging) {
        // Ease between speeds
        if (state.easeStart !== null) {
          const elapsed = now - state.easeStart;
          const t = Math.min(elapsed / EASE_DURATION, 1);
          state.currentSpeed =
            state.easeFrom +
            (state.targetSpeed - state.easeFrom) * easeInOutCubic(t);
          if (t >= 1) state.easeStart = null;
        }
        state.offset -= state.currentSpeed;
      }

      // Wrap in both directions
      state.offset = wrapOffset(state.offset, state.halfWidth);

      belt.style.transform = `translateX(${state.offset}px)`;
      state.rafId = requestAnimationFrame(tick);
    },
    [speed]
  );

  useEffect(() => {
    const belt = beltRef.current;
    const track = trackRef.current;
    if (!belt || !track) return;

    const measureWidth = () => {
      animRef.current.halfWidth = belt.scrollWidth / 2;
    };
    measureWidth();
    window.addEventListener("resize", measureWidth);

    // Hover handlers
    const onEnter = () => {
      const s = animRef.current;
      if (s.isDragging || s.isMomentum) return;
      s.easeFrom = s.currentSpeed;
      s.targetSpeed = 0;
      s.easeStart = performance.now();
    };
    const onLeave = () => {
      const s = animRef.current;
      if (s.isDragging || s.isMomentum) return;
      s.easeFrom = s.currentSpeed;
      s.targetSpeed = speed;
      s.easeStart = performance.now();
    };

    // Shared drag logic
    const startDrag = (pageX: number, target: HTMLElement) => {
      if (target.closest("a")) return;
      const s = animRef.current;
      s.isDragging = true;
      s.isMomentum = false;
      s.dragStartX = pageX;
      s.dragStartOffset = s.offset;
      s.dragVelocity = 0;
      s.lastDragX = pageX;
      s.lastDragTime = performance.now();
      s.currentSpeed = 0;
      s.targetSpeed = 0;
      s.easeStart = null;
    };
    const moveDrag = (pageX: number) => {
      const s = animRef.current;
      if (!s.isDragging) return;
      const now = performance.now();
      const dt = now - s.lastDragTime;
      if (dt > 0) {
        s.dragVelocity = (pageX - s.lastDragX) / Math.max(dt, 8) * 16;
      }
      s.lastDragX = pageX;
      s.lastDragTime = now;
      s.offset = s.dragStartOffset + (pageX - s.dragStartX);
    };
    const endDrag = () => {
      const s = animRef.current;
      if (!s.isDragging) return;
      s.isDragging = false;
      track.style.cursor = "";
      if (Math.abs(s.dragVelocity) > MIN_VELOCITY) {
        s.isMomentum = true;
      } else {
        s.easeFrom = 0;
        s.targetSpeed = speed;
        s.easeStart = performance.now();
      }
    };

    // Mouse handlers
    const onMouseDown = (e: MouseEvent) => {
      startDrag(e.pageX, e.target as HTMLElement);
      track.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!animRef.current.isDragging) return;
      e.preventDefault();
      moveDrag(e.pageX);
    };
    const onMouseUp = () => endDrag();

    // Touch handlers
    const onTouchStart = (e: TouchEvent) => {
      startDrag(e.touches[0].pageX, e.target as HTMLElement);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!animRef.current.isDragging) return;
      e.preventDefault();
      moveDrag(e.touches[0].pageX);
    };
    const onTouchEnd = () => endDrag();

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    animRef.current.rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current.rafId);
      window.removeEventListener("resize", measureWidth);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
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

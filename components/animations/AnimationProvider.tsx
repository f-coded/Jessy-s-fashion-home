"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoother } from "./smoother";
import { initTextAnimations } from "./text";
import { initScrollAnimations } from "./scroll";
import { initPins } from "./pins";
import { initHoverEffects } from "./hoverEffects";

gsap.registerPlugin(ScrollTrigger);

/**
 * Boots every GSAP behaviour after hydration, in the same order the template does:
 * smoother + fixed footer reveal → text splits → scroll effects → pins → hover effects.
 */
export default function AnimationProvider() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    let cancelled = false;

    // Deferred one tick past hydration (timeout rather than rAF so a background tab still boots).
    const boot = window.setTimeout(() => {
      if (cancelled) return;
      cleanups.push(initSmoother());
      cleanups.push(initTextAnimations());
      cleanups.push(initScrollAnimations());
      cleanups.push(initPins());
      cleanups.push(initHoverEffects());
      ScrollTrigger.refresh();
    }, 0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // Debounced refresh when the document resizes (images loading, fonts, etc.)
    let lastScroll = 0;
    const onScroll = () => (lastScroll = performance.now());
    window.addEventListener("scroll", onScroll, { passive: true });
    let timer: number | null = null;
    const schedule = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (performance.now() - lastScroll < 150) schedule();
        else {
          timer = null;
          ScrollTrigger.refresh();
        }
      }, 200);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);

    return () => {
      cancelled = true;
      window.clearTimeout(boot);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (timer !== null) window.clearTimeout(timer);
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}

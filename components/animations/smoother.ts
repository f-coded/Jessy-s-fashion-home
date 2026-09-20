import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initializes Lenis smooth scrolling (synchronized with GSAP ScrollTrigger)
 * + fixed-bottom footer reveal scale effect.
 */
export function initSmoother(): () => void {
  const cleanups: Array<() => void> = [];

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
    infinite: false,
  });

  lenisInstance = lenis;

  // Sync Lenis scroll updates with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  cleanups.push(() => {
    gsap.ticker.remove(updateTicker);
    lenis.destroy();
    lenisInstance = null;
  });

  // Global anchor click listener for smooth scrolling to #id targets
  const handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest<HTMLAnchorElement>("a[href^='#']");
    if (!anchor) return;
    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;

    const elem = document.querySelector(hash);
    if (elem) {
      e.preventDefault();
      lenis.scrollTo(elem as HTMLElement, { offset: 0, duration: 1.2 });
    }
  };

  window.addEventListener("click", handleAnchorClick);
  cleanups.push(() => window.removeEventListener("click", handleAnchorClick));

  // Footer reveal animation
  const footer = document.querySelector<HTMLElement>(".footer-fixed-bottom");
  const placeholder = document.querySelector<HTMLElement>(".footer-placeholder");
  const footerArea = document.querySelector<HTMLElement>(".footer-fixed-bottom .at-footer-area");

  const syncFooter = () => {
    if (footer && placeholder) {
      placeholder.style.height = `${footer.offsetHeight}px`;
      ScrollTrigger.refresh();
    }
  };

  if (footer && placeholder) {
    syncFooter();
    window.addEventListener("resize", syncFooter);
    const ro = new ResizeObserver(syncFooter);
    ro.observe(footer);
    cleanups.push(() => {
      window.removeEventListener("resize", syncFooter);
      ro.disconnect();
    });
  }

  if (footer && footerArea && placeholder) {
    gsap.set(footerArea, { scale: 0.95 });
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: placeholder,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      .to(footerArea, { scale: 1, ease: "none" }, 0);
    cleanups.push(() => tl.kill());
  }

  return () => cleanups.forEach((c) => c());
}

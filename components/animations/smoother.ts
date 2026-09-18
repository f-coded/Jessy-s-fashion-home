import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/**
 * ScrollSmoother (smooth: 1.35) + the fixed-bottom footer reveal:
 * a placeholder the height of the footer sits at the end of the content and
 * the footer scales 0.95 → 1 as the placeholder scrolls into view.
 */
export function initSmoother(): () => void {
  const wrapper = document.getElementById("smooth-wrapper");
  const content = document.getElementById("smooth-content");
  const footer = document.querySelector<HTMLElement>(".footer-fixed-bottom");
  const placeholder = document.querySelector<HTMLElement>(".footer-placeholder");
  const footerArea = document.querySelector<HTMLElement>(".footer-fixed-bottom .at-footer-area");
  const cleanups: Array<() => void> = [];

  const sync = () => {
    if (footer && placeholder) {
      placeholder.style.height = `${footer.offsetHeight}px`;
      ScrollTrigger.refresh();
    }
  };
  if (footer && placeholder) {
    sync();
    window.addEventListener("resize", sync);
    const ro = new ResizeObserver(sync);
    ro.observe(footer);
    cleanups.push(() => {
      window.removeEventListener("resize", sync);
      ro.disconnect();
    });
  }

  if (wrapper && content) {
    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.35,
      effects: true,
      smoothTouch: 0.15,
      ignoreMobileResize: true,
    });
    cleanups.push(() => smoother.kill());
  }

  sync();
  if (footer && footerArea && placeholder) {
    gsap.set(footerArea, { scale: 0.95 });
    const tl = gsap
      .timeline({
        scrollTrigger: { trigger: placeholder, start: "top bottom", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
      })
      .to(footerArea, { scale: 1, ease: "none" }, 0);
    cleanups.push(() => tl.kill());
  }

  return () => cleanups.forEach((c) => c());
}

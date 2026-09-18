import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Killable = { kill?: () => void };

/**
 * Generic scroll-driven effects:
 *  - `.move-up` (portfolio cube shapes): drift up 500px
 *  - `.scroll-move-up` (award rows, blog cards): drift up 100px
 *  - `.at-about-svg-wrap` svgs slide in from left/top/right
 *  - `.at_fade_anim` fade-in with data-* options
 *  - `.scale-img-from-to` scrubbed image scale (portfolio thumbs)
 *  - `.at-item-anime.marque` slides glide horizontally with scroll (image slider)
 */
export function initScrollAnimations(): () => void {
  const items: Killable[] = [];

  const moveUp = Array.from(document.querySelectorAll<HTMLElement>(".move-up"));
  if (moveUp.length) {
    const tw = gsap.to(moveUp, {
      transformOrigin: "top",
      y: "-500px",
      duration: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: moveUp[0], start: "top center", scrub: 1, invalidateOnRefresh: true },
    });
    items.push(tw, tw.scrollTrigger!);
  }

  document.querySelectorAll<HTMLElement>(".scroll-move-up").forEach((el) => {
    const tw = gsap.to(el, {
      y: -100,
      duration: 1.5,
      scrollTrigger: { trigger: el, start: "top 70%", scrub: 1, invalidateOnRefresh: true },
    });
    items.push(tw, tw.scrollTrigger!);
  });

  document.querySelectorAll<HTMLElement>(".at-about-svg-wrap").forEach((wrap) => {
    if (wrap.hasAttribute("data-about-svg-done")) return;
    const [a, b, c] = [1, 2, 3].map((n) => wrap.querySelector(`svg:nth-child(${n})`));
    const st = { trigger: wrap, start: "top 90%", end: "bottom center", scrub: 1 };
    if (a) items.push(gsap.from(a, { transformOrigin: "left center", duration: 1, ease: "power2.out", x: "-100px", scrollTrigger: st }));
    if (b) items.push(gsap.from(b, { transformOrigin: "center center", duration: 1, ease: "power2.out", y: "-100px", scrollTrigger: st }));
    if (c) items.push(gsap.from(c, { transformOrigin: "right center", duration: 1, ease: "power2.out", x: "100px", scrollTrigger: st }));
    wrap.setAttribute("data-about-svg-done", "true");
  });

  document.querySelectorAll<HTMLElement>(".at_fade_anim").forEach((el) => {
    const offset = parseFloat(el.getAttribute("data-fade-offset") ?? "40") || 40;
    const duration = parseFloat(el.getAttribute("data-duration") ?? "0.75") || 0.75;
    const from = (el.getAttribute("data-fade-from") ?? "bottom").toLowerCase();
    const onScroll = el.getAttribute("data-on-scroll") ?? "1";
    const delay = parseFloat(el.getAttribute("data-delay") ?? "0.15") || 0.15;
    const vars: gsap.TweenVars = {
      opacity: 0,
      ease: el.getAttribute("data-ease") ?? "power2.out",
      duration,
      delay,
      x: from === "left" ? -offset : from === "right" ? offset : 0,
      y: from === "top" ? -offset : from === "bottom" ? offset : 0,
    };
    if (onScroll === "1") vars.scrollTrigger = { trigger: el, start: "top 85%" };
    items.push(gsap.from(el, vars));
  });

  document.querySelectorAll<HTMLElement>(".scale-img-from-to").forEach((el) => {
    let v1 = parseFloat(el.getAttribute("data-value-1") ?? "") || 1.5;
    const v2 = parseFloat(el.getAttribute("data-value-2") ?? "") || 1;
    if (window.innerWidth < 1200) v1 = Math.max(0.95, v1);
    items.push(
      gsap.fromTo(el, { ease: "sine", scale: v1 }, { scale: v2, scrollTrigger: { trigger: el, scrub: true, toggleActions: "play none none reverse" } }),
    );
  });

  const marq = Array.from(document.querySelectorAll<HTMLElement>(".at-item-anime.marque"));
  const marqArea = document.querySelector<HTMLElement>(".at-item-anime-area");
  if (marq.length && marqArea) {
    gsap.set(marq, { x: "35%" });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: marqArea, start: "-1000 0%", end: "bottom 0%", scrub: true, invalidateOnRefresh: true },
    });
    tl.to(marq, { x: "-200%" });
    items.push(tl, tl.scrollTrigger!);
  }

  return () => {
    items.forEach((i) => i.kill?.());
    document.querySelectorAll(".at-about-svg-wrap").forEach((e) => e.removeAttribute("data-about-svg-done"));
  };
}

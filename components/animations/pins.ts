import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Pinned / stacked sections:
 *  - `.postbox-scroll-zoom`: showreel clip-path zoom, marquee fade, play button pop-in
 *  - `.section-fix`: testimonials — title pinned, cards stack with scale 0.9 + `.active`
 *  - `.scroll-section` (outside .section-fix): services — stacked pinned panels
 */
export function initPins(): () => void {
  const cleanups: Array<() => void> = [];

  const ctx = gsap.context(() => {
    // Showreel zoom
    document.querySelectorAll<HTMLElement>(".postbox-scroll-zoom").forEach((sec) => {
      const item = sec.querySelector<HTMLElement>(".postbox-item");
      const img = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-img");
      const play = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-play");
      const marquee = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-marquee");
      if (!item || !img || !play) return;
      const insets = () => {
        const r = img.getBoundingClientRect();
        return { x: Math.max((r.width - 200) / 2, 0), y: Math.max((r.height - 100) / 2, 0) };
      };
      {
        const { x, y } = insets();
        gsap.set(img, { clipPath: `inset(${y}px ${x}px ${y}px ${x}px round 4px)` });
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        img,
        {
          clipPath: () => {
            const { x, y } = insets();
            return `inset(${y}px ${x}px ${y}px ${x}px round 4px)`;
          },
          ease: "none",
        },
        { clipPath: "inset(0px 0px 0px 0px round 42px)", duration: 1, ease: "none" },
        0,
      );
      if (marquee) tl.fromTo(marquee, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.6 }, 0);
      tl.fromTo(play, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ease: "none" }, 0.78);
      tl.call(() => sec.classList.add("postbox-scroll-zoom-ready"), [], 0.78);
    });

    // Testimonials (section-fix)
    document.querySelectorAll<HTMLElement>(".section-fix").forEach((sec) => {
      const title = sec.querySelector(".section-title-pin");
      const scroll = sec.querySelector(".scroll-section.vertical-section");
      if (!scroll || !title) return;
      const wrapper = scroll.querySelector(".wrapper");
      if (!wrapper) return;
      const items = Array.from(wrapper.querySelectorAll<HTMLElement>(".item"));
      if (!items.length) return;
      gsap.set(items[0], { minHeight: "100vh", height: "auto" });
      items.forEach((it, i) => i !== 0 && gsap.set(it, { yPercent: 100 }));
      const setActive = (progress: number) => {
        const idx = Math.min(Math.floor(Math.min(Math.max(progress, 0), 0.9999) * items.length), items.length - 1);
        items.forEach((it, i) => it.classList.toggle("active", i === idx));
      };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          pin: true,
          start: "top top",
          end: () => `+=${50 * items.length}%`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(self.progress),
        },
        defaults: { ease: "none", duration: 1 },
      });
      items.forEach((it, i) => {
        tl.to(it, { scale: 0.9 });
        if (items[i + 1]) tl.to(items[i + 1], { yPercent: 0 }, "<");
      });
      const onScroll = () => {
        if (tl.scrollTrigger?.isActive) setActive(tl.scrollTrigger.progress ?? 0);
      };
      ScrollTrigger.addEventListener("scrollEnd", onScroll);
      cleanups.push(() => ScrollTrigger.removeEventListener("scrollEnd", onScroll));
    });

    // Stand-alone pinned titles (≥1400px)
    gsap.matchMedia().add("(min-width: 1400px)", () => {
      document.querySelectorAll<HTMLElement>(".section-title-pin").forEach((el) => {
        if (el.closest(".section-fix")) return;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            pin: el,
            scrub: 1,
            start: "top bottom+=200",
            endTrigger: el.closest("section") ?? document.body,
            end: "bottom top",
            pinSpacing: false,
          },
        });
      });
    });

    // Services stacked panels
    document.querySelectorAll<HTMLElement>(".scroll-section").forEach((sec) => {
      if (sec.closest(".section-fix")) return;
      const wrapper = sec.querySelector(".wrapper");
      const list = wrapper?.querySelectorAll<HTMLElement>(".item");
      if (!list?.length) return;
      const horizontal = sec.classList.contains("horizontal-section");
      const items = Array.from(list);
      items.forEach((it, i) => {
        gsap.set(it, { zIndex: i });
        if (i !== 0) gsap.set(it, horizontal ? { xPercent: 100 } : { yPercent: 100 });
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, pin: true, start: "top top", end: () => `+=${50 * items.length}%`, scrub: 1, invalidateOnRefresh: true },
        defaults: { ease: "none" },
      });
      items.forEach((it, i) => {
        tl.to(it, { scale: 0.9 });
        if (items[i + 1]) tl.to(items[i + 1], horizontal ? { xPercent: 0 } : { yPercent: 0 }, "<");
      });
    });
  });

  return () => {
    cleanups.forEach((c) => c());
    ctx.revert();
  };
}

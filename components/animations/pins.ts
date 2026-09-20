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
    // Showreel zoom & frame-by-frame controlled video parallax scrub
    document.querySelectorAll<HTMLElement>(".postbox-scroll-zoom").forEach((sec) => {
      const item = sec.querySelector<HTMLElement>(".postbox-item");
      const media = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-img");
      const marquee = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-marquee");
      if (!item || !media) return;

      const video = media instanceof HTMLVideoElement ? media : media.querySelector<HTMLVideoElement>("video");
      if (video) {
        video.pause();
      }

      const itemWrap = sec.querySelector<HTMLElement>(".postbox-item-wrap");
      if (itemWrap) {
        itemWrap.style.height = "250vh";
      }

      const insets = () => {
        const r = media.getBoundingClientRect();
        return { x: Math.max((r.width - 240) / 2, 0), y: Math.max((r.height - 120) / 2, 0) };
      };
      {
        const { x, y } = insets();
        gsap.set(media, { clipPath: `inset(${y}px ${x}px ${y}px ${x}px round 8px)` });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Expand clip-path from compact slot to full bleed
      tl.fromTo(
        media,
        {
          clipPath: () => {
            const { x, y } = insets();
            return `inset(${y}px ${x}px ${y}px ${x}px round 8px)`;
          },
          scale: 1.1,
        },
        { clipPath: "inset(0px 0px 0px 0px round 36px)", scale: 1, duration: 0.4, ease: "power1.inOut" },
        0
      );

      // Fade marquee background text
      if (marquee) {
        tl.fromTo(marquee, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.9, ease: "none", duration: 0.3 }, 0);
      }

      // Frame-by-frame video scrub controlled per scroll
      if (video) {
        const videoState = { currentTime: 0 };
        const getDuration = () => (video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 5);

        tl.to(
          videoState,
          {
            currentTime: () => getDuration(),
            ease: "none",
            duration: 1,
            onUpdate: () => {
              if (video && !isNaN(video.duration) && video.duration > 0) {
                try {
                  video.currentTime = videoState.currentTime;
                } catch {
                  // handle seeking
                }
              }
            },
          },
          0
        );
      }

      tl.call(() => sec.classList.add("postbox-scroll-zoom-ready"), [], 0.4);
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
          end: () => `+=${60 * items.length}%`,
          scrub: 0.8,
          invalidateOnRefresh: false,
          onUpdate: (self) => setActive(self.progress),
        },
        defaults: { ease: "none" },
      });
      items.forEach((it, i) => {
        tl.to(it, { scale: 0.93, opacity: 0.9 });
        if (items[i + 1]) {
          tl.fromTo(items[i + 1], { yPercent: 100 }, { yPercent: 0, duration: 1 }, "<");
        }
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
        scrollTrigger: {
          trigger: sec,
          pin: true,
          start: "top top",
          end: () => `+=${60 * items.length}%`,
          scrub: 0.8,
          invalidateOnRefresh: false,
        },
        defaults: { ease: "none" },
      });
      items.forEach((it, i) => {
        tl.to(it, { scale: 0.93 });
        if (items[i + 1]) {
          if (horizontal) {
            tl.fromTo(items[i + 1], { xPercent: 100 }, { xPercent: 0, duration: 1 }, "<");
          } else {
            tl.fromTo(items[i + 1], { yPercent: 100 }, { yPercent: 0, duration: 1 }, "<");
          }
        }
      });
    });
  });

  return () => {
    cleanups.forEach((c) => c());
    ctx.revert();
  };
}

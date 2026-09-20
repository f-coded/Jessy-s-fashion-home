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
    // Showreel clip-path zoom & scroll-controlled video frame scrubbing
    document.querySelectorAll<HTMLElement>(".postbox-scroll-zoom").forEach((sec) => {
      const item = sec.querySelector<HTMLElement>(".postbox-item");
      const media = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-img");
      const marquee = sec.querySelector<HTMLElement>(".postbox-scroll-zoom-marquee");
      if (!item || !media) return;

      const video = media instanceof HTMLVideoElement ? media : media.querySelector<HTMLVideoElement>("video");
      if (video) {
        video.pause();
      }

      // Set initial floating video card clip-path
      gsap.set(media, { clipPath: "inset(calc(50% - 150px) calc(50% - 250px) round 16px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec.querySelector(".postbox-item-wrap") || item,
          start: "top top",
          end: "+=150%",
          pin: item,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Expand floating video card from central slot to full bleed
      tl.fromTo(
        media,
        {
          clipPath: "inset(calc(50% - 150px) calc(50% - 250px) round 16px)",
          scale: 1.15,
        },
        { clipPath: "inset(0px 0px 0px 0px round 42px)", scale: 1, duration: 0.4, ease: "power1.inOut" },
        0
      );

      // Fade marquee background text
      if (marquee) {
        tl.fromTo(marquee, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.3 }, 0);
      }

      // Controlled video playback scrubbing on scroll (2-3 seconds per scroll step)
      if (video) {
        const videoState = { currentTime: 0 };

        tl.to(
          videoState,
          {
            currentTime: () => (video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 6),
            ease: "none",
            duration: 1,
            onUpdate: () => {
              if (video) {
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
        tl.to(it, { scale: 0.95, opacity: 1 });
        if (items[i + 1]) {
          tl.fromTo(items[i + 1], { yPercent: 100, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 1 }, "<");
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

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import Swiper from "swiper";
import { Autoplay, FreeMode, Thumbs } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowBend16 } from "@/components/ui/Icons";
import SplitText from "@/components/ui/SplitText";

const THUMBS = [1, 2, 3, 4, 5].map((n) => `/assets/imgs/avatar/thumb-${n}.jpg`);
const QUOTE =
  "Every look starts with a person, not a trend. I style you, source what it takes, and deliver it to your door.";

/**
 * Five avatar thumbs fan out on scroll (GSAP), synced to an autoplaying quote swiper.
 * Same swiper config + scroll timeline as the template.
 */
export default function QuoteSlider() {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = thumbsRef.current;
    const m = mainRef.current;
    if (!t || !m) return;
    const thumbs = new Swiper(t, {
      modules: [FreeMode, Thumbs],
      spaceBetween: 0,
      slidesPerView: 5,
      freeMode: true,
      loop: false,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    });
    const main = new Swiper(m, {
      modules: [Autoplay, Thumbs],
      slidesPerView: 1,
      slidesPerGroup: 1,
      centeredSlides: true,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      thumbs: { swiper: thumbs },
    });
    return () => {
      main.destroy(true, true);
      thumbs.destroy(true, true);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let mm: gsap.MatchMedia | null = null;
    const timer = setTimeout(() => {
      const t = thumbsRef.current;
      if (!t) return;
      const section = t.closest("section");
      const wrapper = t.querySelector(".swiper-wrapper");
      if (!section || !wrapper) return;
      const s = Array.from(wrapper.children) as HTMLElement[];
      const [a, b, , c, d] = s;
      if (!a || !b || !c || !d) return;
      mm = gsap.matchMedia();
      mm.add("(max-width: 574.98px)", () => {
        gsap.set([a, b, c, d], { clearProps: "x,y" });
        return () => {};
      });
      mm.add("(min-width: 576px) and (max-width: 1399px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 50%", end: "bottom 70%", scrub: 1, invalidateOnRefresh: true },
        });
        tl.to(a, { x: -70, y: 20, duration: 1 }, 0)
          .to(b, { x: -80, y: -60, duration: 1 }, 0)
          .to(c, { x: 70, y: -86, duration: 1 }, 0)
          .to(d, { x: 65, y: 15, duration: 1 }, 0);
        return () => tl.kill();
      });
      mm.add("(min-width: 1400px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 50%", end: "bottom 70%", scrub: 1, invalidateOnRefresh: true },
        });
        tl.to(a, { x: -500, y: 200, duration: 1 }, 0)
          .to(b, { x: -200, y: -100, duration: 1 }, 0)
          .to(c, { x: 300, y: -70, duration: 1 }, 0)
          .to(d, { x: 500, y: 200, duration: 1 }, 0);
        return () => tl.kill();
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      mm?.revert();
    };
  }, []);

  return (
    <section className="sec-5-home-2 pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="swiper slider-testimonial-thumbs overflow-visible" ref={thumbsRef}>
              <div className="swiper-wrapper position-relative">
                {THUMBS.map((src, i) => (
                  <div key={src} className={`swiper-slide d-flex justify-content-center thumb-slide-${i + 1}`}>
                    <div className="avatar-thumbnail">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Inside Jenny's Fashion Home" width={150} height={150} className="img-cover" src={src} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-8 mx-auto">
            <div className="swiper slider-testimonial-2 mt-50" ref={mainRef}>
              <div className="swiper-wrapper">
                {THUMBS.map((_, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="text-center">
                      <h3 className="fw-700 reveal-text">
                        <span style={{ display: "inline-block" }}>
                          <SplitText text={QUOTE} />
                        </span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="justify-content-center d-flex mt-50">
              <div className="at-btn-group at_fade_anim" data-delay=".4" data-fade-from="bottom" data-ease="bounce">
                <Link className="at-btn-circle" aria-label="Previous slide" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  <ArrowBend16 />
                </Link>
                <Link className="at-btn z-index-1" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </Link>
                <Link className="at-btn-circle" aria-label="Next slide" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  <ArrowBend16 />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

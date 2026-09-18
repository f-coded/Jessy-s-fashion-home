"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";

const SLIDES = [1, 2, 3, 4, 5].map((n) => `/assets/imgs/pages/slide-${n}.jpg`);

/** Looping image swiper whose slides also glide horizontally with scroll (`.at-item-anime.marque`). */
export default function ImageSlider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const sw = new Swiper(ref.current, {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      breakpoints: {
        576: { slidesPerView: 1, spaceBetween: 24 },
        768: { slidesPerView: 1, spaceBetween: 24 },
        992: { slidesPerView: 2, spaceBetween: 30 },
      },
    });
    return () => {
      sw.destroy(true, true);
    };
  }, []);

  return (
    <section className="home-2-section-8">
      <div className="swiper about-me-slider-active at-item-anime-area" ref={ref}>
        <div className="swiper-wrapper">
          {SLIDES.map((src) => (
            <div key={src} className="swiper-slide">
              <div className="about-me-slider-thumb at-item-anime marque">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Inside Jenny's Fashion Home" width={900} height={700} className="w-100 rounded-4" src={src} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

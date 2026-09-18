"use client";

import Marquee from "react-fast-marquee";

const BRANDS = [1, 2, 3, 4, 5, 6].map((n) => `/assets/imgs/brand/brand-${n}.svg`);

/** Infinite partner-logo ticker (react-fast-marquee, same as the template). */
export default function BrandTicker() {
  return (
    <div className="carouselTicker carouselTicker-left position-relative z-1">
      <Marquee className="carouselTicker__marquee" speed={50} gradient={false} autoFill>
        <ul className="carouselTicker__list" style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, overflow: "visible", gap: "0 2rem" }}>
          {BRANDS.map((src) => (
            <li key={src} className="carouselTicker__item" style={{ margin: "0 1.5rem", float: "none" }}>
              <div className="brand-item dark-mode-invert">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="logo-brand" src={src} height={40} style={{ height: 35, width: "auto" }} />
              </div>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}

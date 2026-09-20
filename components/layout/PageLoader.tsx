"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Ten vertical bars that collapse with a stagger, then the loader fades out.
 * Exactly mirrors the template's loader timeline.
 */
export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const bars = root.querySelectorAll(".bar");
    const logo = root.querySelector<HTMLImageElement>(".page-loader-logo img");

    const run = () => {
      gsap.to(bars, { duration: 1.5, height: 0, stagger: { amount: 0.5 }, ease: "power4.inOut" });
      setTimeout(() => {
        gsap.to(root, {
          duration: 0.5,
          opacity: 0,
          ease: "power2.inOut",
          onComplete: () => {
            root.style.display = "none";
          },
        });
      }, 900);
    };

    if (logo) {
      if (logo.complete) {
        gsap.to(logo, { duration: 1, scale: 1.5 });
        run();
      } else {
        const onLoad = () => {
          logo.removeEventListener("load", onLoad);
          gsap.to(logo, { duration: 1, scale: 1.5 });
          run();
        };
        logo.addEventListener("load", onLoad);
      }
    } else {
      run();
    }
  }, []);

  return (
    <div className="page-loader" ref={ref}>
      <div className="page-loader-logo hide-animation">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="page-loader-logo-img"
          alt="Jenny's Fashion Home"
          style={{ height: "85px", width: "auto", objectFit: "contain" }}
          src="/assets/imgs/logo/brand-logo.png"
        />
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bar"></div>
      ))}
    </div>
  );
}

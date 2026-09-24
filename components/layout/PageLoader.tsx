"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * Ten vertical bars that collapse with a stagger, then the loader fades out.
 * Re-animates smoothly on page loads and client-side route transitions.
 */
export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const bars = root.querySelectorAll(".bar");
    const logoContainer = root.querySelector<HTMLDivElement>(".page-loader-logo");

    // Reset loader to full curtain view
    root.style.display = "flex";
    root.style.opacity = "1";
    gsap.set(bars, { height: "105vh" });
    if (logoContainer) {
      gsap.set(logoContainer, { opacity: 1, scale: 1 });
    }

    const run = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          root.style.display = "none";
        },
      });

      // 1. Fade out & scale down logo immediately as curtain reveal starts
      if (logoContainer) {
        tl.to(
          logoContainer,
          {
            duration: 0.35,
            opacity: 0,
            scale: 0.92,
            ease: "power2.out",
          },
          0
        );
      }

      // 2. Collapse curtain bars staggered to reveal the page underneath
      tl.to(
        bars,
        {
          duration: 1.0,
          height: 0,
          stagger: { amount: 0.35 },
          ease: "power4.inOut",
        },
        0.05
      );

      // 3. Fade out root container smoothly
      tl.to(
        root,
        {
          duration: 0.2,
          opacity: 0,
          ease: "power1.inOut",
        },
        "-=0.2"
      );
    };

    const timer = setTimeout(run, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="page-loader" ref={ref}>
      <div className="page-loader-logo hide-animation">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="page-loader-logo-img"
          alt="Jenny's Fashion Home"
          style={{ height: "135px", width: "auto", objectFit: "contain" }}
          src="/assets/imgs/logo/brand-logo.png"
        />
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bar"></div>
      ))}
    </div>
  );
}

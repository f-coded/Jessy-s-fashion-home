"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const titleScriptRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const sigRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const topLinkRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Use the scrolling footer-placeholder in the DOM flow as trigger
      const triggerTarget = document.querySelector(".footer-placeholder") || footerRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerTarget,
          start: "top 75%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // 1. Tag (05) CONTACT - letter tracking expand & drop down
      if (tagRef.current) {
        tl.fromTo(
          tagRef.current,
          { opacity: 0, y: -25, letterSpacing: "0.4em" },
          { opacity: 1, y: 0, letterSpacing: "0.18em", duration: 0.8, ease: "back.out(1.7)" },
          0
        );
      }

      // 2. Main Title: "Let's make it" rise & "yours." flourish spin
      if (titleTextRef.current) {
        tl.fromTo(
          titleTextRef.current,
          { opacity: 0, y: 50, rotateX: -30 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
          0.15
        );
      }
      if (titleScriptRef.current) {
        tl.fromTo(
          titleScriptRef.current,
          { opacity: 0, scale: 0.5, rotate: -15, y: 30 },
          { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.6)" },
          0.3
        );
      }

      // 3. WhatsApp Pill Button - pop & magnetic bounce
      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { opacity: 0, scale: 0.6, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(2)" },
          0.4
        );
      }

      // 4. Single Divider Line - expand out from center
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "center center", opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.inOut" },
          0.5
        );
      }

      // 5. Giant Watermark "Jennifer" - deep parallax zoom fade
      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { opacity: 0, scale: 1.25, y: 80 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power2.out" },
          0.55
        );
      }

      // 6. 3 Contact Columns - 3 distinct entries: Left slide, Bottom lift, Right slide
      if (col1Ref.current) {
        tl.fromTo(
          col1Ref.current,
          { opacity: 0, x: -60, skewX: 5 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.9, ease: "power3.out" },
          0.75
        );
      }

      if (col2Ref.current) {
        tl.fromTo(
          col2Ref.current,
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          0.85
        );
      }

      if (col3Ref.current) {
        tl.fromTo(
          col3Ref.current,
          { opacity: 0, x: 60, skewX: -5 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.9, ease: "power3.out" },
          0.95
        );
      }

      // 7. Bottom Bar - Signature left tilt, Copyright float, Back-to-top bounce right
      if (sigRef.current) {
        tl.fromTo(
          sigRef.current,
          { opacity: 0, x: -30, rotate: -4 },
          { opacity: 1, x: 0, rotate: 0, duration: 0.8, ease: "power2.out" },
          1.05
        );
      }

      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          1.15
        );
      }

      if (topLinkRef.current) {
        tl.fromTo(
          topLinkRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.9, ease: "back.out(1.7)" },
          1.25
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer-fixed-bottom changeless text-white p-relative overflow-hidden"
      id="footer"
      style={{ backgroundColor: "#0e0d0b" }}
    >
      <div className="at-footer-area pt-90 pb-40 p-relative z-1">
        <div className="container">
          {/* Top Contact Section */}
          <div className="text-center mb-5">
            {/* Section Tag */}
            <span
              ref={tagRef}
              className="d-inline-block text-uppercase fw-500 mb-3"
              style={{ color: "#cda052", letterSpacing: "0.18em", fontSize: "12px" }}
            >
              (05) CONTACT
            </span>

            {/* Main Headline */}
            <h2
              ref={titleTextRef}
              className="display-3 fw-bold text-white mb-4"
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                letterSpacing: "-0.03em",
                fontSize: "clamp(36px, 5vw, 68px)",
                perspective: "1000px",
              }}
            >
              Let&apos;s make it{" "}
              <span
                ref={titleScriptRef}
                className="d-inline-block"
                style={{
                  fontFamily: "var(--font-script), cursive",
                  color: "#cda052",
                  fontWeight: 400,
                  fontStyle: "italic",
                  marginLeft: "4px",
                }}
              >
                yours.
              </span>
            </h2>

            {/* WhatsApp CTA Pill Button */}
            <div ref={btnRef} className="d-flex justify-content-center mt-4">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn d-inline-flex align-items-center gap-2 px-4 py-3 rounded-pill fw-bold text-decoration-none shadow-sm transition-all jfh-gold-pill-btn"
                style={{
                  backgroundColor: "#cda052",
                  color: "#0e0d0b",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                CHAT WITH JENNY ON WHATSAPP
              </a>
            </div>
          </div>

          {/* SINGLE SUBTLE DIVIDER LINE */}
          <div
            ref={lineRef}
            className="my-5"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
          ></div>

          {/* LOWER FOOTER SECTION WITH GIANT GRADIENT WATERMARK */}
          <div className="p-relative pt-3 pb-2">
            {/* Giant Centered Watermark "Jennifer" */}
            <div
              ref={watermarkRef}
              className="p-absolute start-50 translate-middle-x w-100 text-center pointer-events-none select-none z-0"
              style={{
                top: "-15px",
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "clamp(110px, 20vw, 300px)",
                fontWeight: 800,
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
                background:
                  "linear-gradient(180deg, rgba(205, 160, 82, 0.16) 0%, rgba(205, 160, 82, 0.06) 45%, rgba(14, 13, 11, 0) 95%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                userSelect: "none",
                WebkitUserSelect: "none",
                pointerEvents: "none",
              }}
            >
              Jennifer
            </div>

            {/* 3 Columns Contact Info */}
            <div className="row g-4 p-relative z-1 align-items-start mb-5 pb-3">
              <div ref={col1Ref} className="col-md-4 col-12 text-center text-md-start">
                <span
                  className="d-block text-uppercase fw-500 mb-2"
                  style={{ color: "#cda052", letterSpacing: "0.14em", fontSize: "12px" }}
                >
                  WHATSAPP / CALL
                </span>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h4 fw-medium text-white text-decoration-none d-block mb-0"
                  style={{ fontSize: "clamp(20px, 2.2vw, 26px)", letterSpacing: "-0.02em", fontWeight: 500 }}
                >
                  {SITE.phoneDisplay}
                </a>
              </div>

              <div ref={col2Ref} className="col-md-4 col-12 text-center text-md-center">
                <span
                  className="d-block text-uppercase fw-500 mb-2"
                  style={{ color: "#cda052", letterSpacing: "0.14em", fontSize: "12px" }}
                >
                  EMAIL
                </span>
                <a
                  href={SITE.mailto}
                  className="h4 fw-medium text-white text-decoration-none d-block mb-0 text-break"
                  style={{ fontSize: "clamp(18px, 1.9vw, 24px)", letterSpacing: "-0.02em", fontWeight: 500 }}
                >
                  {SITE.email}
                </a>
              </div>

              <div ref={col3Ref} className="col-md-4 col-12 text-center text-md-end">
                <span
                  className="d-block text-uppercase fw-500 mb-2"
                  style={{ color: "#cda052", letterSpacing: "0.14em", fontSize: "12px" }}
                >
                  VISIT
                </span>
                <span
                  className="h4 fw-medium text-white d-block mb-0"
                  style={{ fontSize: "clamp(20px, 2.2vw, 26px)", letterSpacing: "-0.02em", fontWeight: 500 }}
                >
                  {SITE.city}
                </span>
              </div>
            </div>

            {/* Bottom Bar Footer with 3 equal columns */}
            <div className="row align-items-center g-3 pt-3 p-relative z-1 text-muted small">
              {/* Signature Logo Left */}
              <div ref={sigRef} className="col-md-4 col-12 text-center text-md-start">
                <span
                  style={{
                    fontFamily: "var(--font-script), cursive",
                    color: "#cda052",
                    fontSize: "30px",
                    lineHeight: 1,
                  }}
                >
                  Jenny&apos;s Fashion Home
                </span>
              </div>

              {/* Copyright Center */}
              <div ref={copyRef} className="col-md-4 col-12 text-center">
                <span className="opacity-75" style={{ fontSize: "13px", color: "#a0a0a0" }}>
                  © {new Date().getFullYear()} {SITE.name}
                </span>
              </div>

              {/* Back to top Link Right */}
              <div ref={topLinkRef} className="col-md-4 col-12 text-center text-md-end">
                <a
                  href="#top-hero"
                  onClick={scrollToTop}
                  className="text-decoration-none transition-all fw-medium"
                  style={{ color: "#cda052", fontSize: "13px", letterSpacing: "0.05em" }}
                >
                  Back to top ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

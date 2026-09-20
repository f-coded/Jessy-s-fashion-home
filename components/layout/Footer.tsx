"use client";

import React from "react";
import { SITE } from "@/lib/site";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
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
              className="d-inline-block text-uppercase fw-500 mb-3"
              style={{ color: "#cda052", letterSpacing: "0.18em", fontSize: "12px" }}
            >
              (05) CONTACT
            </span>

            {/* Main Headline */}
            <h2
              className="display-3 fw-bold text-white mb-4"
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                letterSpacing: "-0.03em",
                fontSize: "clamp(36px, 5vw, 68px)",
              }}
            >
              Let&apos;s make it{" "}
              <span
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
            <div className="d-flex justify-content-center mt-4">
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

          {/* SINGLE SUBTLE DIVIDER LINE (NOT WHITE, DARK MUTED TONE) */}
          <div
            className="my-5"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
          ></div>

          {/* LOWER FOOTER SECTION WITH GIANT GRADIENT WATERMARK */}
          <div className="p-relative pt-3 pb-2">
            {/* Giant Centered Watermark "Jennifer" with Vertical Fade Gradient to Transparent */}
            <div
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

            {/* 3 Columns Contact Info (Centered on mobile, left-aligned on desktop) */}
            <div className="row g-4 p-relative z-1 align-items-start mb-5 pb-3">
              <div className="col-md-4 col-12 text-center text-md-start">
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

              <div className="col-md-4 col-12 text-center text-md-start">
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

              <div className="col-md-4 col-12 text-center text-md-start">
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

            {/* Bottom Bar Footer with 3 equal columns for dead-center copyright text */}
            <div className="row align-items-center g-3 pt-3 p-relative z-1 text-muted small">
              {/* Signature Logo Left */}
              <div className="col-md-4 col-12 text-center text-md-start">
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

              {/* Copyright Center - 100% geometrically centered */}
              <div className="col-md-4 col-12 text-center">
                <span className="opacity-75" style={{ fontSize: "13px", color: "#a0a0a0" }}>
                  © {new Date().getFullYear()} {SITE.name}
                </span>
              </div>

              {/* Back to top Link Right */}
              <div className="col-md-4 col-12 text-center text-md-end">
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

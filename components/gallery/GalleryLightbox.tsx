"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/lib/gallery";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function GalleryLightbox({ items, currentIndex, onClose, onSelectIndex }: GalleryLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeItem = currentIndex !== null ? items[currentIndex] : null;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex === null || items.length === 0) return;
      onSelectIndex((currentIndex - 1 + items.length) % items.length);
    },
    [currentIndex, items.length, onSelectIndex]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex === null || items.length === 0) return;
      onSelectIndex((currentIndex + 1) % items.length);
    },
    [currentIndex, items.length, onSelectIndex]
  );

  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex, handlePrev, handleNext, onClose]);

  if (!mounted || currentIndex === null || !activeItem) return null;

  return createPortal(
    <div className="jfh-lightbox-modal">
      {/* Clickable Backdrop overlay - clicking anywhere outside elements closes the modal */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        onClick={onClose}
        style={{ zIndex: 1, cursor: "pointer" }}
      />

      {/* Main Content Layer */}
      <div
        className="position-relative w-100 h-100 d-flex flex-column justify-content-between p-3 p-md-4"
        style={{ zIndex: 2, pointerEvents: "none" }}
      >
        {/* Top Header Controls */}
        <div className="d-flex align-items-center justify-content-between w-100" style={{ pointerEvents: "auto" }}>
          {/* Photo Counter */}
          <div className="px-3 py-2 rounded-pill bg-dark bg-opacity-90 text-white border border-secondary border-opacity-25 fz-14 fw-600 shadow">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Preview"
            className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center p-0 border border-secondary border-opacity-25 text-white shadow"
            style={{ width: "44px", height: "44px", fontSize: "20px", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* Center Area: Image & Nav Arrows */}
        <div className="position-relative flex-grow-1 d-flex align-items-center justify-content-center my-2" style={{ minHeight: 0 }}>
          {/* Previous Arrow */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="jfh-lightbox-nav jfh-lightbox-nav--prev position-absolute start-0 top-50 translate-middle-y btn btn-dark rounded-circle border border-light border-opacity-25 p-0 d-flex align-items-center justify-content-center text-white shadow ms-2 ms-md-4"
              style={{ width: "52px", height: "52px", zIndex: 10, pointerEvents: "auto", cursor: "pointer" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Active Image Container */}
          <div
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ pointerEvents: "auto", maxHeight: "80vh", maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeItem.id || activeItem.src}
              src={activeItem.src}
              alt={activeItem.caption || "Jenny's Fashion Home"}
              className="jfh-lightbox-active-img rounded-4 shadow-2xl"
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
                display: "block",
              }}
            />
          </div>

          {/* Next Arrow */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="jfh-lightbox-nav jfh-lightbox-nav--next position-absolute end-0 top-50 translate-middle-y btn btn-dark rounded-circle border border-light border-opacity-25 p-0 d-flex align-items-center justify-content-center text-white shadow me-2 me-md-4"
              style={{ width: "52px", height: "52px", zIndex: 10, pointerEvents: "auto", cursor: "pointer" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* Bottom Caption Pill */}
        {activeItem.caption ? (
          <div className="text-center pb-2" style={{ pointerEvents: "auto" }}>
            <div className="d-inline-block px-4 py-2 rounded-pill bg-dark bg-opacity-90 text-white border border-secondary border-opacity-25 fz-15 fw-500 shadow">
              {activeItem.caption}
            </div>
          </div>
        ) : (
          <div style={{ height: "20px" }} />
        )}
      </div>
    </div>,
    document.body
  );
}

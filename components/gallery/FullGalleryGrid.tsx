"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";
import AtBtn from "@/components/ui/AtBtn";

// Supplementary curated lookbook images to offer a rich full visual gallery experience
const EXTRA_LOOKS: GalleryItem[] = [
  { id: "extra-couture-1", src: "/assets/imgs/pages/work-1.jpg", caption: "Haute Couture Gown — Velvet & Gold Embroidery", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-2", src: "/assets/imgs/pages/work-2.jpg", caption: "Silk Runway Collection — Spring Edition", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-3", src: "/assets/imgs/pages/work-3.jpg", caption: "Bespoke Bridal Fitting in Studio", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-4", src: "/assets/imgs/pages/work-4.jpg", caption: "Ready-to-Wear Evening Collection", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-5", src: "/assets/imgs/pages/work-5.jpg", caption: "Custom Tailoring & Pattern Cutting", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-6", src: "/assets/imgs/pages/work-6.jpg", caption: "Designer Textiles & Metallic Accents", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-slide-1", src: "/assets/imgs/pages/slide-1.jpg", caption: "Boutique Display & Evening Wear", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-slide-2", src: "/assets/imgs/pages/slide-2.jpg", caption: "Contemporary Fashion Line", addedAt: "2026-09-18T00:00:00.000Z" },
];

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "uploads", label: "Admin Uploads" },
  { id: "boutique", label: "Boutique & Store" },
  { id: "couture", label: "Couture & Gowns" },
];

const PATTERN = ["wide", "tall", "", "", "tall", "wide"];

export default function FullGalleryGrid({ uploadedItems }: { uploadedItems: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Combine uploaded items with curated extras (avoiding duplicates)
  const allItems = useMemo(() => {
    const existingIds = new Set(uploadedItems.map((i) => i.id));
    const uniqueExtras = EXTRA_LOOKS.filter((ex) => !existingIds.has(ex.id));
    return [...uploadedItems, ...uniqueExtras];
  }, [uploadedItems]);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const isUpload = !item.id.startsWith("seed-") && !item.id.startsWith("extra-");
      const isBoutique = item.id.startsWith("seed-") || item.src.includes("/store/");
      const isCouture = item.id.startsWith("extra-") || item.src.includes("/work-") || item.src.includes("/slide-");

      if (activeCategory === "uploads" && !isUpload) return false;
      if (activeCategory === "boutique" && !isBoutique) return false;
      if (activeCategory === "couture" && !isCouture) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const cap = (item.caption || "").toLowerCase();
        const id = item.id.toLowerCase();
        return cap.includes(query) || id.includes(query);
      }

      return true;
    });
  }, [allItems, activeCategory, searchQuery]);

  const activeItem = openIndex !== null ? filteredItems[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) => {
      setOpenIndex((idx) => {
        if (idx === null || filteredItems.length === 0) return null;
        return (idx + dir + filteredItems.length) % filteredItems.length;
      });
    },
    [filteredItems.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  return (
    <div className="jfh-full-gallery">
      {/* Search & Filter Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-40 pb-20 border-bottom">
        {/* Categories */}
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? allItems.length
                : cat.id === "uploads"
                ? uploadedItems.filter((i) => !i.id.startsWith("seed-")).length
                : cat.id === "boutique"
                ? allItems.filter((i) => i.id.startsWith("seed-") || i.src.includes("/store/")).length
                : allItems.filter((i) => i.id.startsWith("extra-") || i.src.includes("/work-")).length;

            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`btn btn-sm rounded-pill px-4 py-2 transition-all ${
                  isActive ? "btn-dark text-white fw-600" : "btn-outline-secondary opacity-75"
                }`}
              >
                {cat.label} <span className="badge bg-secondary ms-1 rounded-pill">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Stats */}
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative" style={{ width: "240px" }}>
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null);
              }}
              className="form-control form-control-sm rounded-pill ps-3 pe-4"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="btn btn-link btn-sm position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none me-2"
              >
                ✕
              </button>
            )}
          </div>
          <span className="fz-font-sm text-muted">
            Showing <strong>{filteredItems.length}</strong> photos
          </span>
        </div>
      </div>

      {/* Grid Display */}
      {filteredItems.length > 0 ? (
        <div className="jfh-gallery-grid">
          {filteredItems.map((it, i) => {
            const size = PATTERN[i % PATTERN.length];
            const isNewUpload = !it.id.startsWith("seed-") && !it.id.startsWith("extra-");

            return (
              <a
                key={it.id}
                href={it.src}
                className={`jfh-gallery-item${size ? ` jfh-gallery-item--${size}` : ""} at_fade_anim position-relative`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(i);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt={it.caption ?? "Jenny's Fashion Home"} loading="lazy" />

                {/* Badges & Captions */}
                <div className="position-absolute top-0 start-0 m-3 z-2">
                  {isNewUpload && <span className="badge bg-dark text-white rounded-pill px-3 py-1">New Upload</span>}
                </div>

                <div className="jfh-gallery-item__cap">
                  <span>{it.caption || "Jenny's Fashion Home Boutique"}</span>
                  <small className="d-block opacity-75 fz-12 mt-1">
                    {new Date(it.addedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </small>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-5 my-5 bg-neutral-100 rounded-4">
          <h4 className="fw-500 mb-2">No photos found</h4>
          <p className="text-muted mb-3">Try adjusting your search query or filter category.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="btn btn-outline-dark rounded-pill px-4"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Modal Lightbox Preview */}
      {activeItem && openIndex !== null && (
        <>
          <div className="mfp-bg mfp-ready" onClick={close}></div>
          <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" tabIndex={-1}>
            <div className="mfp-container mfp-s-ready mfp-image-holder" onClick={(e) => e.target === e.currentTarget && close()}>
              <div className="mfp-content position-relative">
                <button title="Close (Esc)" type="button" className="mfp-close" onClick={close}>
                  ×
                </button>

                <div className="text-center position-relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="jfh-lightbox-img rounded-3 shadow-lg" src={activeItem.src} alt={activeItem.caption ?? ""} />

                  {/* Lightbox Footer & Details */}
                  <div className="mt-3 text-white text-center">
                    <h5 className="text-white mb-1 fw-500">{activeItem.caption || "Jenny's Fashion Home Boutique"}</h5>
                    <p className="fz-font-sm text-white-50 mb-0">
                      Photo {openIndex + 1} of {filteredItems.length} — Added{" "}
                      {new Date(activeItem.addedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                    <div className="mt-2 d-flex justify-content-center gap-3">
                      <a
                        href={activeItem.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-light rounded-pill px-3"
                      >
                        Open Full Image ↗
                      </a>
                    </div>
                  </div>
                </div>

                {filteredItems.length > 1 && (
                  <>
                    <button type="button" className="mfp-arrow mfp-arrow-left" aria-label="Previous" onClick={() => step(-1)} />
                    <button type="button" className="mfp-arrow mfp-arrow-right" aria-label="Next" onClick={() => step(1)} />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

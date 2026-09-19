"use client";

import { useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";
import AtBtn from "@/components/ui/AtBtn";
import GalleryLightbox from "./GalleryLightbox";

// Supplementary curated lookbook images to offer a rich full visual gallery experience
const EXTRA_LOOKS: GalleryItem[] = [
  { id: "extra-couture-1", src: "/assets/imgs/pages/work-1.jpg", caption: "Haute Couture Gown: Velvet & Gold Embroidery", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-2", src: "/assets/imgs/pages/work-2.jpg", caption: "Silk Runway Collection: Spring Edition", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-3", src: "/assets/imgs/pages/work-3.jpg", caption: "Bespoke Bridal Fitting in Studio", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-4", src: "/assets/imgs/pages/work-4.jpg", caption: "Ready-to-Wear Evening Collection", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-5", src: "/assets/imgs/pages/work-5.jpg", caption: "Custom Tailoring & Pattern Cutting", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-couture-6", src: "/assets/imgs/pages/work-6.jpg", caption: "Designer Textiles & Metallic Accents", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-slide-1", src: "/assets/imgs/pages/slide-1.jpg", caption: "Boutique Display & Evening Wear", addedAt: "2026-09-18T00:00:00.000Z" },
  { id: "extra-slide-2", src: "/assets/imgs/pages/slide-2.jpg", caption: "Contemporary Fashion Line", addedAt: "2026-09-18T00:00:00.000Z" },
];

const CATEGORIES = [
  { id: "all", label: "All Photos" },
  { id: "boutique", label: "Boutique & Store" },
  { id: "couture", label: "Couture & Gowns" },
  { id: "fabrics", label: "Fabrics" },
  { id: "machines", label: "Sewing Machines" },
];

function matchCategory(item: GalleryItem, catId: string): boolean {
  if (catId === "all") return true;

  const cap = (item.caption || "").toLowerCase();
  const id = item.id.toLowerCase();
  const src = item.src.toLowerCase();
  const full = `${cap} ${id} ${src}`;

  if (catId === "boutique") {
    return id.startsWith("seed-") || src.includes("/store/") || full.includes("boutique") || full.includes("store") || full.includes("display") || full.includes("floor");
  }
  if (catId === "couture") {
    return id.startsWith("extra-") || full.includes("couture") || full.includes("gown") || full.includes("bridal") || full.includes("fashion") || full.includes("wear");
  }
  if (catId === "fabrics") {
    return full.includes("fabric") || full.includes("textile") || full.includes("silk") || full.includes("velvet") || full.includes("pattern") || full.includes("work-6");
  }
  if (catId === "machines") {
    return full.includes("machine") || full.includes("sewing") || full.includes("atelier") || full.includes("sketch") || full.includes("studio") || full.includes("fitting") || full.includes("work-5");
  }
  return true;
}

const PATTERN = ["wide", "tall", "", "", "tall", "wide"];

export default function FullGalleryGrid({ uploadedItems }: { uploadedItems: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine uploaded items with curated extras (avoiding duplicates)
  const allItems = useMemo(() => {
    const existingIds = new Set(uploadedItems.map((i) => i.id));
    const uniqueExtras = EXTRA_LOOKS.filter((ex) => !existingIds.has(ex.id));
    return [...uploadedItems, ...uniqueExtras];
  }, [uploadedItems]);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (!matchCategory(item, activeCategory)) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const cap = (item.caption || "").toLowerCase();
        const id = item.id.toLowerCase();
        return cap.includes(query) || id.includes(query);
      }

      return true;
    });
  }, [allItems, activeCategory, searchQuery]);

  return (
    <div className="jfh-full-gallery">
      {/* Search & Filter Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-40 pb-20 border-bottom">
        {/* Categories */}
        <div className="d-flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count = allItems.filter((i) => matchCategory(i, cat.id)).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
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
                setLightboxIndex(null);
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

            return (
              <a
                key={it.id}
                href={it.src}
                className={`jfh-gallery-item${size ? ` jfh-gallery-item--${size}` : ""} at_fade_anim position-relative`}
                onClick={(e) => {
                  e.preventDefault();
                  setLightboxIndex(i);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.src} alt={it.caption ?? "Jenny's Fashion Home"} loading="lazy" />

                <div className="jfh-gallery-item__cap">
                  <span>{it.caption || "Jenny's Fashion Home Boutique"}</span>
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

      {/* Premium Lightbox Modal */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}



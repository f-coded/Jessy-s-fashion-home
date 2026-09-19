"use client";

import { useState } from "react";
import type { GalleryItem } from "@/lib/gallery";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";

/** Size pattern repeats every 6 tiles so any number of uploads still forms a clean mosaic. */
const PATTERN = ["wide", "tall", "", "", "tall", "wide"];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="jfh-gallery-grid">
        {items.map((it, i) => {
          const size = PATTERN[i % PATTERN.length];
          return (
            <a
              key={it.id}
              href={it.src}
              className={`jfh-gallery-item${size ? ` jfh-gallery-item--${size}` : ""} at_fade_anim`}
              data-fade-from="bottom"
              data-delay={String(0.1 + (i % 3) * 0.12)}
              onClick={(e) => {
                e.preventDefault();
                setLightboxIndex(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.caption ?? "Jenny's Fashion Home"} loading="lazy" />
              {it.caption && <span className="jfh-gallery-item__cap">{it.caption}</span>}
            </a>
          );
        })}
      </div>

      <GalleryLightbox
        items={items}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}



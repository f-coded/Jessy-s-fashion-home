"use client";

import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/lib/gallery";

/** Size pattern repeats every 6 tiles so any number of uploads still forms a clean mosaic. */
const PATTERN = ["wide", "tall", "", "", "tall", "wide"];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("mfp-zoom-out-cur");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("mfp-zoom-out-cur");
    };
  }, [open, close, step]);

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
                setOpen(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.caption ?? "Jenny's Fashion Home"} loading="lazy" />
              {it.caption && <span className="jfh-gallery-item__cap">{it.caption}</span>}
            </a>
          );
        })}
      </div>

      {open !== null && items[open] && (
        <>
          <div className="mfp-bg mfp-ready" onClick={close}></div>
          <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" tabIndex={-1}>
            <div className="mfp-container mfp-s-ready mfp-image-holder" onClick={(e) => e.target === e.currentTarget && close()}>
              <div className="mfp-content">
                <button title="Close (Esc)" type="button" className="mfp-close" onClick={close}>
                  ×
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="jfh-lightbox-img" src={items[open].src} alt={items[open].caption ?? ""} />
                {items.length > 1 && (
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
    </>
  );
}

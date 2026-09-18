"use client";

import { useEffect, useState, type ReactNode } from "react";

function toEmbed(url: string) {
  const m = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1` : url;
}
const isFile = (url: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(url);

/** `.popup-video` link that opens a magnific-popup style iframe lightbox. */
export default function VideoPopup({ href, children }: { href: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.classList.add("mfp-zoom-out-cur");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("mfp-zoom-out-cur");
    };
  }, [open]);

  return (
    <>
      <a
        className="popup-video"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open && (
        <>
          <div className="mfp-bg mfp-ready" onClick={() => setOpen(false)}></div>
          <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready" tabIndex={-1}>
            <div className="mfp-container mfp-s-ready mfp-iframe-holder" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
              <div className="mfp-content">
                <div className="mfp-iframe-scaler">
                  <button title="Close (Esc)" type="button" className="mfp-close" onClick={() => setOpen(false)}>
                    ×
                  </button>
                  {isFile(href) ? (
                    <video className="mfp-iframe" src={href} controls autoPlay playsInline />
                  ) : (
                    <iframe className="mfp-iframe" src={toEmbed(href)} allowFullScreen allow="autoplay; encrypted-media" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

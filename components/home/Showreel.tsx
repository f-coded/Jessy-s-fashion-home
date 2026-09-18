import { Fragment } from "react";
import { PlayIcon } from "@/components/ui/Icons";
import VideoPopup from "./VideoPopup";

const ROWS: { dir: "left" | "right"; words: string[] }[] = [
  { dir: "left", words: ["INSIDE THE STORE", "WATCH NOW", "PLAY", "HARRINGTON, DE"] },
  { dir: "right", words: ["SCROLL TO REVEAL", "JENNY'S FASHION HOME", "BEHIND THE SEAMS", "2026"] },
  { dir: "left", words: ["PLAY", "STYLING", "FABRICS & MACHINES", "WATCH"] },
  { dir: "right", words: ["STYLED BY JENNY", "STORE TOUR", "PLAY", "WATCH NOW"] },
];

const VIDEO = "/assets/video/boutique.mp4";

/** Pinned clip-path zoom: image grows from a small slot to full bleed while marquee rows fade. */
export default function Showreel() {
  return (
    <div className="container-2200 pb-100">
      <section className="home-2-section-11 postbox-scroll-zoom mx-lg-3 mx-2 mt-50 align-items-center justify-content-center" id="showreel">
        <div className="postbox-item-wrap">
          <div className="postbox-item">
            <div className="postbox-thumb p-relative rounded-5">
              <div className="postbox-scroll-zoom-marquee" aria-hidden="true">
                {ROWS.map((row, i) => (
                  <div key={i} className={`postbox-scroll-zoom-marquee-row dir-${row.dir}`}>
                    <div className="postbox-scroll-zoom-marquee-track">
                      {[...row.words, ...row.words].map((w, j) => (
                        <Fragment key={j}>
                          <span>{w}</span>
                          <span>•</span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <a href="#">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="postbox-scroll-zoom-img img-cover" src="/assets/imgs/pages/showreel-bg.jpg" alt="Jenny's Fashion Home storefront" />
              </a>
              <div className="postbox-play-btn postbox-scroll-zoom-play z-index-1 d-flex align-items-center justify-content-center gap-3">
                <h1 className="text-white d-none d-md-flex">Play</h1>
                <VideoPopup href={VIDEO}>
                  <span className="text-white">
                    <PlayIcon />
                  </span>
                </VideoPopup>
                <h1 className="text-white d-none d-md-flex">store tour</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Fragment } from "react";

const ROWS: { dir: "left" | "right"; words: string[] }[] = [
  { dir: "left", words: ["INSIDE THE STORE", "BOUTIQUE EXPERIENCE", "HARRINGTON, DE", "JENNY'S FASHION HOME"] },
  { dir: "right", words: ["SCROLL TO REVEAL", "BEHIND THE SEAMS", "2026", "LUXURY FASHION"] },
  { dir: "left", words: ["STYLING", "FABRICS & DESIGNS", "EXCLUSIVE COLLECTION", "WATCH"] },
  { dir: "right", words: ["STYLED BY JENNY", "STORE TOUR", "HAUTE COUTURE", "ELEGANCE"] },
];

const BOUTIQUE_VIDEO = "/assets/video/Fashion_boutique_interior_advert._20260918065357.mp4";

/** Pinned clip-path zoom: boutique video expands from central slot to full bleed while marquee text fades. */
export default function Showreel() {
  return (
    <div className="container-2200 pb-100">
      <section className="home-2-section-11 postbox-scroll-zoom mx-lg-3 mx-2 mt-50 align-items-center justify-content-center" id="showreel">
        <div className="postbox-item-wrap">
          <div className="postbox-item">
            <div className="postbox-thumb p-relative rounded-5 overflow-hidden">
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
              <video
                className="postbox-scroll-zoom-img img-cover"
                src={BOUTIQUE_VIDEO}
                poster="/assets/imgs/pages/showreel-bg.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

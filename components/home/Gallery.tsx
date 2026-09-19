import AtBtn from "@/components/ui/AtBtn";
import SplitText from "@/components/ui/SplitText";
import BtnGroup from "@/components/ui/BtnGroup";
import GalleryGrid from "./GalleryGrid";
import { SEED } from "@/lib/gallery";

/**
 * Gallery — Home page preview section showing curated store highlights.
 * Clicking 'Explore our Gallery' takes visitors to the full dynamic gallery page (/gallery).
 */
export default function Gallery() {
  return (
    <div className="container-2200" id="gallery">
      <section className="jfh-gallery bg-neutral-50 rounded-5 mx-lg-3 mx-2 pt-120 pb-120 mt-50">
        <div className="container">
          <div className="row g-4 align-items-end mb-60">
            <div className="col-xxl-6 col-lg-7">
              <AtBtn as="span" className="common-black bg-transparent mb-10 rounded-0 p-0" textClassName="text-uppercase">
                Gallery Showcase
              </AtBtn>
              <h1 className="fz-ds-1 fw-500 lh-1 mb-0 reveal-text">
                <SplitText text="Step inside the Home" />
              </h1>
            </div>
            <div className="col-xxl-4 col-lg-5 ms-auto d-flex flex-column align-items-lg-end gap-4">
              <div className="at_fade_anim" data-delay=".3">
                <p className="mg-portfolio-dec mb-0 fz-font-lg text-lg-end">
                  Racks of ready-to-wear, the gown wall, the sketch room and the machines; a walk through the boutique in
                  Harrington, Delaware.
                </p>
              </div>
              <BtnGroup href="/gallery" label="Explore our Gallery" transparent fade={{ delay: ".5", from: "bottom", ease: "bounce" }} />
            </div>
          </div>
          <GalleryGrid items={SEED} />
        </div>
      </section>
    </div>
  );
}

import { HeroShape } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="sec-1-home-2 pt-85 container-2200" id="top-hero">
      <div className="overflow-hidden p-relative pt-70 pb-70 pt-md-90 pb-md-90 mx-lg-3 mx-2 rounded-5 jfh-hero">
        {/* Boutique video backdrop + dark veil */}
        <video
          className="jfh-hero__video"
          src="/assets/video/boutique.mp4"
          poster="/assets/imgs/store/boutique.jpg"
          autoPlay
          muted
          loop
          playsInline
        ></video>
        <div className="jfh-hero__veil"></div>
        <div
          className="p-absolute top-0 left-0 w-100 h-100 rounded-5 opacity-10 z-0"
          style={{ backgroundImage: "url(/assets/imgs/pages/noise.gif)" }}
        ></div>

        <div className="container p-relative z-1 py-3 py-md-4">
          <div className="row justify-content-center text-center">
            <div className="col-xxl-10 col-xl-11 col-12">
              {/* Enhanced Subheadline Badge */}
              <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-2 mb-4 px-3 px-md-4 py-2-5 rounded-pill bg-black bg-opacity-50 border border-white border-opacity-20 backdrop-blur shadow-sm">
                <HeroShape />
                <span className="fz-font-md fw-500 text-white mb-0 text-center">
                  Haute couture styling, curated fabrics, ready-to-wear collections & sewing machines. Styled, sourced and delivered by Jenny in Harrington, Delaware.
                </span>
              </div>

              {/* Main Title Centered using Main Sans-Serif Font */}
              <div className="at-title-anim overflow-hidden my-3 my-md-4">
                <h1 className="jfh-hero-title fw-600 mb-0 at-title-text text-white text-center">
                  Jenny&apos;s Fashion Home<sup className="fw-400">®</sup>
                </h1>
              </div>

              {/* Direct WhatsApp Contact Pill */}
              <div className="mt-4 pt-2">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-flex align-items-center gap-2 px-4 py-3 rounded-pill bg-white bg-opacity-15 text-white border border-white border-opacity-25 backdrop-blur fz-font-lg fw-500 text-decoration-none transition-all shadow"
                >
                  <span className="jfh-whatsapp text-white fw-600">WhatsApp:</span>
                  <span>[ {SITE.phoneDisplay} ]</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


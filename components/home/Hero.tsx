import { HeroShape } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="sec-1-home-2 pt-85 container-2200" id="top-hero">
      <div className="overflow-hidden p-relative pt-100 pb-80 pt-md-140 pb-md-100 mx-lg-3 mx-2 rounded-5 jfh-hero">
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

        <div className="container p-relative z-1">
          {/* Top Row: Subheadline Text & Icon Centered */}
          <div className="row justify-content-center text-center mb-4 mb-md-5">
            <div className="col-xxl-8 col-xl-9 col-lg-10 col-12 text-center">
              <div className="at-hero-service pb-3 pb-md-4 border-bottom border-white border-opacity-30">
                <div className="d-flex flex-column align-items-center justify-content-center gap-3 text-center">
                  <HeroShape />
                  <span className="fz-font-md fw-500 text-white text-center lh-base">
                    Bespoke haute couture, designer fabrics, ready-to-wear fashion and sewing machine supplies for brands, artists and makers worldwide.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Main Title Centered + Phone Number */}
          <div className="row justify-content-center text-center mt-2">
            <div className="col-12">
              <div className="at-title-anim overflow-hidden text-center">
                <h1 className="jfh-hero-title fw-600 mb-0 at-title-text text-white text-center">
                  Jenny&apos;s Fashion Home<sup className="fw-400">®</sup>
                </h1>
              </div>
              <div className="d-flex justify-content-center justify-content-md-end align-items-center mt-4">
                <p className="fz-font-lg fw-500 mb-0 text-white">
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="jfh-whatsapp text-decoration-none">
                    [ {SITE.phoneDisplay} ]
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



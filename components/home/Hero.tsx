import { HeroShape, SocialArrow } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

const SOCIAL = ["Instagram", "TikTok", "Facebook", "Pinterest"];

export default function Hero() {
  return (
    <section className="sec-1-home-2 pt-85 container-2200" id="top-hero">
      <div className="overflow-hidden p-relative pt-90 pb-90 mx-lg-3 mx-2 rounded-5 jfh-hero">
        {/* Boutique video backdrop + dark veil so the copy stays legible in both themes */}
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
          <div className="row g-4 align-items-end">
            <div className="col-xxl-4 col-lg-5 col-md-6 col-12">
              <div className="alt-hero-service at-hero-service mt-40">
                <ul>
                  <li>
                    <HeroShape />
                  </li>
                  <li>
                    <span className="fz-font-md fw-500 text-white">
                      Styled by Jenny: haute couture looks for clients and artists, plus fabrics, ready-to-wear and sewing machines
                      delivered to brands and makers.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xxl-8 col-12 ps-xxl-5">
              <div className="at-title-anim overflow-hidden">
                <h1 className="fz-160 fw-600 mb-0 at-title-text text-white">
                  <span className="hero-title-script">Jenny&apos;s</span>Fashion Home<sup className="fz-80 fw-400">®</sup>
                </h1>
              </div>
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="at-hero-social style-2">
                  {SOCIAL.map((s) => (
                    <a key={s} href="#">
                      {s}
                      <SocialArrow />
                    </a>
                  ))}
                </div>
                <p className="fz-font-lg fw-500 mb-0 text-white">
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="jfh-whatsapp">
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

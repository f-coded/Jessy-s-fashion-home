import AtBtn from "@/components/ui/AtBtn";
import SplitText from "@/components/ui/SplitText";
import BrandTicker from "./BrandTicker";
import { ArrowUpRight11 } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

export default function Partners() {
  return (
    <section className="sec-3-home-2 pt-130 pb-130" id="brands">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-12">
            <div className="at-about-title-wrap d-flex flex-wrap flex-lg-nowrap align-items-start gap-4 mb-30">
              <AtBtn as="span" className="common-black bg-transparent rounded-0 p-0 mt-xxl-2" textClassName="text-uppercase text-nowrap">
                Brands we carry
              </AtBtn>
              <h4 className="at-section-title reveal-text">
                <SplitText text="The fabrics, machines and labels Jenny trusts, supplied to brands, artists and makers." />
              </h4>
            </div>
          </div>
          <div className="col-lg-11 col-12 ms-auto at-brand-area border-0">
            <BrandTicker />
          </div>
          <div className="col-12">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <a className="at-btn bg-transparent p-relative" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Fashionista" width={140} height={140} src="/assets/imgs/pages/badge-1.svg" />
                <span className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center justify-content-center">
                  <i className="text-white">
                    <ArrowUpRight11 />
                    <ArrowUpRight11 />
                  </i>
                  <span className="mt-2">
                    <span className="fw-700 text-white">Let&apos;s Talk</span>
                  </span>
                </span>
              </a>
              <p className="mb-0">
                Need a fabric, a machine or a full look? <br className="d-block" /> Message Jenny on WhatsApp and it&apos;s <br className="d-block" /> sourced, styled and delivered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

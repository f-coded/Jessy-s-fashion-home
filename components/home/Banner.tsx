import AtBtn from "@/components/ui/AtBtn";
import SplitText from "@/components/ui/SplitText";
import { StarShape, CardShape } from "@/components/ui/Icons";

const ITEMS = ["Haute Couture Styling", "Fabrics & Textiles", "Ready-to-Wear", "Sewing Machines"];

/** "About Jenny" — blended personal + business story on the boutique backdrop. */
export default function Banner() {
  return (
    <section className="sec-2-home-2 container-2200" id="about">
      <div className="mx-4 pt-20 pb-20">
        <div className="d-flex align-items-center justify-content-between">
          <StarShape />
          <StarShape />
          <StarShape />
        </div>
      </div>
      <div
        className="bg-coating rounded-5 overflow-hidden mx-lg-3 mx-2 bg-cover"
        style={{ backgroundImage: "url(/assets/imgs/pages/banner-bg.jpg)" }}
      >
        <video
          src="/assets/video/live-bg.mov"
          autoPlay
          muted
          loop
          playsInline
          className="img-cover p-absolute top-0 start-0 end-0 bottom-0 z-0"
        ></video>
        <div className="container pb-100 p-relative z-index-2">
          <div className="row">
            {ITEMS.map((t) => (
              <div key={t} className="col-lg-3 col-md-6 col-12 text-center">
                <AtBtn
                  as="div"
                  className="at-btn-border-white ps-2 pt-20 pb-20 pe-2 text-white bg-transparent rounded-0 border-top-0 border-start-0 border-end-0 w-100"
                >
                  {t}
                </AtBtn>
              </div>
            ))}
          </div>
        </div>
        <div className="container pb-100 p-relative z-index-2">
          <div className="row g-4 justify-content-lg-between justify-content-center align-items-end">
            <div className="col-lg-5 col-12">
              <div className="at-about-title-wrap">
                <AtBtn as="span" className="text-white bg-transparent mb-10 rounded-0 p-0" textClassName="text-uppercase">
                  about jenny
                </AtBtn>
                <h2 className="at-section-title reveal-text text-white lh-1 mb-40 mt-20">
                  <SplitText text="A stylist's eye, a supplier's reach." />
                </h2>
                <p className="text-white mb-0">
                  Based in Harrington, Delaware with a global presence, Jenny&apos;s Fashion Home is where timeless elegance meets worldwide
                  glamour. Jenny started as a stylist and fashionista, dressing clients, international buyers and recording artists in one-of-a-kind haute couture,
                  and grew that eye into a global brand that supplies fabrics, ready-to-wear and sewing machines to brands,
                  artists and makers worldwide.
                  <br className="d-xxl-block d-lg-none d-none" /> Step in, browse, and find something that&apos;s unmistakably you.
                </p>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-7 tp_fade-anim">
              <div className="card-item p-relative at_fade_anim" data-fade-from="bottom" data-duration="1" data-delay="0.5">
                <div className="card-item__bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Gowns on the rail at Jenny's Fashion Home" width={400} height={400} className="home-2-card-item__bg-img img-cover" src="/assets/imgs/pages/card-bg.jpg" />
                </div>
                <div className="card-item-avatar p-absolute top-0 end-0 changeless">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Atelier mannequin" width={65} height={65} className="home-2-card-item__avatar-img" src="/assets/imgs/avatar/card-avatar.jpg" />
                </div>
                <div className="card-item-content p-absolute bottom-0 start-0">
                  <CardShape />
                  <h6 className="card-item-text mb-0 text-white">Trusted by brands, artists and everyday fashion lovers worldwide</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

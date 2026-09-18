import AtBtn from "@/components/ui/AtBtn";
import BtnGroup from "@/components/ui/BtnGroup";
import SplitText from "@/components/ui/SplitText";
import { FiveStars } from "@/components/ui/Icons";

const ITEMS = [
  {
    text: "“Jenny didn’t just dress me for the show — she built the whole look around my set. Every fitting was precise, every fabric was right.”",
    name: "Amara D.",
    role: "Recording Artist",
    company: "Wilmington, Delaware",
    avatar: "/assets/imgs/avatar/avatar-1.jpg",
  },
  {
    text: "“We source our fabrics and two of our industrial machines through Jenny. Fast, honest and she knows exactly what a small label needs.”",
    name: "Marcus Hale",
    role: "Founder, Hale & Co. Apparel",
    company: "Dover, Delaware",
    avatar: "/assets/imgs/avatar/avatar-2.jpg",
  },
  {
    text: "“My wedding gown was sketched, fitted and finished in her studio. It felt couture in every sense — and so completely me.”",
    name: "Hannah Lee",
    role: "Bridal Client",
    company: "Harrington, Delaware",
    avatar: "/assets/imgs/avatar/avatar-3.jpg",
  },
];

/** Pinned title + stacked testimonial cards (`.section-fix` / `.scroll-active-item`). */
export default function Testimonials() {
  return (
    <div className="container-2200">
      <section className="rounded-5 mx-lg-3 mx-2 bg-neutral-50 overflow-hidden pb-lg-5">
        <div className="section-fix pt-120 pb-100">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5 h-100">
                <div className="section-title-pin h-100">
                  <AtBtn as="span" className="common-black bg-transparent mb-10 rounded-0 p-0" textClassName="text-uppercase">
                    Why clients stay
                  </AtBtn>
                  <h1 className="section-title fw-500 fz-ds-1 lh-1 mb-30 reveal-text">
                    <SplitText text="What clients say about Jenny" />
                  </h1>
                  <BtnGroup href="#gallery" label="See the gallery" />
                </div>
              </div>
              <div className="col-xxl-6 col-lg-7 ms-auto position-relative">
                <div className="scroll-section vertical-section section scroll-active-item">
                  <div className="wrapper">
                    <div className="list" role="list">
                      {ITEMS.map((t) => (
                        <div key={t.name} className="item">
                          <div className="testimonial-cart-wrap style-2 p-md-5 p-4">
                            <div className="rectangular"></div>
                            <div className="testimonial-content-rating mb-3">
                              <div className="testimonial-content-rating-stars">
                                <FiveStars />
                              </div>
                            </div>
                            <div className="testimonial-bottom-wrap">
                              <div className="testimonial-content">
                                <p className="testimonial-content-text fz-font-3xl fw-400 lh-sm text-truncate-4 neutral-900">{t.text}</p>
                                <div className="testimonial-author d-flex mb-0">
                                  <div className="testimonial-left-img">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img alt={t.name} width={56} height={56} src={t.avatar} />
                                  </div>
                                  <div className="testimonial-content">
                                    <h6 className="testimonial-content-author-name fw-600 mb-0">{t.name}</h6>
                                    <p className="testimonial-content-author-position m-0">{t.role}</p>
                                    <p className="testimonial-content-author-company m-0">{t.company}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

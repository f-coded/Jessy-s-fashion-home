import Link from "next/link";
import BtnGroup from "@/components/ui/BtnGroup";
import { BigStar122, BigArrow104, PlusIcon, PrimaryLogoMark } from "@/components/ui/Icons";

type PortfolioItem = {
  id: string;
  name: string;
  tag: string;
  title: string;
  img: string;
  aspectRatio: string;
};

const DES = "Styled, sourced and delivered by Jenny's Fashion Home, Harrington DE";

const LEFT_COLUMN_ITEMS: PortfolioItem[] = [
  {
    id: "work-1",
    name: "The Storefront",
    tag: "Styling",
    title: "Window looks styled by Jenny",
    img: "/assets/imgs/pages/work-1.jpg",
    aspectRatio: "4 / 5",
  },
  {
    id: "work-3",
    name: "Ready-to-Wear",
    tag: "RTW Supply",
    title: "Curated collections for brands & boutiques",
    img: "/assets/imgs/pages/work-3.jpg",
    aspectRatio: "1 / 1",
  },
  {
    id: "work-5",
    name: "Mannequin Room",
    tag: "Fittings",
    title: "Fittings, alterations & finishing",
    img: "/assets/imgs/pages/work-5.jpg",
    aspectRatio: "4 / 5",
  },
];

const RIGHT_COLUMN_ITEMS: PortfolioItem[] = [
  {
    id: "work-2",
    name: "The Gown Wall",
    tag: "Haute Couture",
    title: "Statement gowns & custom silhouettes",
    img: "/assets/imgs/pages/work-2.jpg",
    aspectRatio: "16 / 11",
  },
  {
    id: "work-4",
    name: "Sketch Studio",
    tag: "Couture",
    title: "Where every custom piece begins",
    img: "/assets/imgs/pages/work-4.jpg",
    aspectRatio: "4 / 5",
  },
  {
    id: "work-6",
    name: "Machines & Tools",
    tag: "Distribution",
    title: "Sewing machines supplied to makers",
    img: "/assets/imgs/pages/work-6.jpg",
    aspectRatio: "16 / 11",
  },
];

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="alt-portfolio-item at-hover-item mb-4 mb-lg-5 w-100">
      <div className="alt-portfolio-content d-flex justify-content-between align-items-center mb-3">
        <h4 className="alt-portfolio-title mb-0 fw-600" style={{ fontSize: "clamp(18px, 1.6vw, 22px)", letterSpacing: "-0.02em" }}>
          <Link className="common-underline text-decoration-none text-white" href="#work">
            {item.name}
          </Link>
        </h4>
        <span className="alt-portfolio-plus text-white opacity-75">
          <PlusIcon />
        </span>
      </div>

      <Link
        className="alt-portfolio-thumb p-relative fix d-block rounded-4 overflow-hidden shadow-lg transition-all"
        href="#work"
        style={{ aspectRatio: item.aspectRatio }}
      >
        <span className="w-100 h-100 d-block scale-img-from-to" data-value-1="1.15" data-value-2="1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={item.name}
            className="img-cover rounded-4 w-100 h-100"
            src={item.img}
            style={{ objectFit: "cover", width: "100%", height: "100%", transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </span>

        <div className="alt-portfolio-btn p-4 z-index-2">
          <div className="content">
            <span
              className="bg-dark bg-opacity-75 text-uppercase border border-light border-opacity-25 px-3 py-1 rounded-pill text-white fw-medium"
              style={{ fontSize: "11px", letterSpacing: "0.1em" }}
            >
              {item.tag}
            </span>
            <h3 className="fw-500 fz-font-3xl text-white mb-0 mt-3" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
              {item.title}
            </h3>
            <p className="text-white-50 fz-font-md mb-0 mt-2 text-truncate-2 des" style={{ fontSize: "14px" }}>
              {DES}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="container-2200" id="work">
      <div className="alt-portfolio-area portfolio-area bg-neutral-50 rounded-5 mx-lg-3 mx-2 pt-100 pb-100">
        <div className="container">
          {/* Title Header */}
          <div className="row mb-5 align-items-end">
            <div className="col-lg-7 col-md-10">
              <div className="alt-portfolio-main-title-wrap portfolio-text">
                <h1
                  className="alt-portfolio-main-title reveal-text fz-ds-1 fw-500 text-white"
                  style={{ fontSize: "clamp(38px, 6.5vw, 90px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                >
                  Inside
                  <span className="jfh-star-rotate d-inline-flex opacity-75 mx-2">
                    <BigStar122 />
                  </span>
                  The
                  <br /> House
                  <span className="jfh-arrow-shift d-inline-flex opacity-75 ms-2 ms-md-3">
                    <BigArrow104 />
                  </span>
                </h1>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 mt-4 mt-lg-0 text-lg-end">
              <p className="text-white-50 mb-0" style={{ fontSize: "clamp(15px, 1.4vw, 18px)", maxWidth: "420px", marginLeft: "auto" }}>
                A curated glimpse into the storefront, gown gallery, sketch studio, and industrial craft spaces of Jenny&apos;s Fashion Home.
              </p>
            </div>
          </div>

          {/* 2-Column Collage Layout */}
          <div className="row g-4 g-lg-5 align-items-start">
            {/* Left Column */}
            <div className="col-lg-6 col-12">
              {LEFT_COLUMN_ITEMS.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>

            {/* Right Column (Staggered offset down on desktop for editorial collage look) */}
            <div className="col-lg-6 col-12 mt-lg-5 pt-lg-4">
              {RIGHT_COLUMN_ITEMS.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Bottom Summary & Gallery CTA */}
          <div className="row mt-5 pt-4">
            <div className="col-xxl-6 col-lg-8 col-md-10 mx-auto text-center">
              <div className="mg-portfolio-title-wrap mb-30 d-flex flex-column align-items-center">
                <PrimaryLogoMark />
                <div className="at_fade_anim mt-4" data-delay=".3">
                  <p className="mg-portfolio-dec mb-4 text-white-50 fz-font-lg" style={{ fontSize: "16px", maxWidth: "560px" }}>
                    From custom bridal fittings to industrial sewing machinery distribution, every corner of our Harrington house is dedicated to couture excellence.
                  </p>
                </div>
                <BtnGroup href="#gallery" label="See the gallery" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

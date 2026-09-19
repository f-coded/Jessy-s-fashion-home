import Link from "next/link";
import BtnGroup from "@/components/ui/BtnGroup";
import { BigStar122, BigArrow104, PlusIcon, CubeShapes, PrimaryLogoMark } from "@/components/ui/Icons";

type Item = {
  name: string;
  tag: string;
  title: string;
  img: string;
  w: number;
  h: number;
  titleFirst: boolean;
  itemClass: string;
  colClass: string;
  btnClass?: string;
  cubes?: boolean;
};

const DES = "Styled, sourced and delivered by Jenny's Fashion Home, Harrington DE";

const ITEMS: Item[] = [
  {
    name: "The Storefront",
    tag: "Styling",
    title: "Window looks styled by Jenny",
    img: "/assets/imgs/pages/work-1.jpg",
    w: 400,
    h: 500,
    titleFirst: true,
    itemClass: "alt-portfolio-item at-hover-item mb-30",
    colClass: "col-xxl-3 col-xl-4 col-lg-5 col-md-6 offset-xxl-4 offset-xl-4",
  },
  {
    name: "The Gown Wall",
    tag: "haute couture",
    title: "Statement gowns & custom silhouettes",
    img: "/assets/imgs/pages/work-2.jpg",
    w: 550,
    h: 540,
    titleFirst: false,
    itemClass: "alt-portfolio-item mb-30 alt-portfolio-item-2 at-hover-item",
    colClass: "col-xxl-4 col-xl-4 offset-xl-7 col-lg-4 col-md-6",
  },
  {
    name: "Ready-to-Wear",
    tag: "rtw supply",
    title: "Curated collections for brands & boutiques",
    img: "/assets/imgs/pages/work-3.jpg",
    w: 400,
    h: 550,
    titleFirst: true,
    itemClass: "alt-portfolio-item alt-portfolio-item-3 mb-30 at-hover-item",
    colClass: "col-xxl-3 col-lg-4 col-md-6",
  },
  {
    name: "Sketch Studio",
    tag: "couture",
    title: "Where every custom piece begins",
    img: "/assets/imgs/pages/work-4.jpg",
    w: 400,
    h: 450,
    titleFirst: false,
    itemClass: "alt-portfolio-item alt-portfolio-item-4 mb-30 at-hover-item",
    colClass: "col-xxl-3 offset-xl-3 col-lg-4 col-md-6",
    btnClass: "end-0 me-3",
    cubes: true,
  },
  {
    name: "Mannequin Room",
    tag: "fittings",
    title: "Fittings, alterations & finishing",
    img: "/assets/imgs/pages/work-5.jpg",
    w: 400,
    h: 550,
    titleFirst: true,
    itemClass: "alt-portfolio-item alt-portfolio-item-5 mb-30 at-hover-item",
    colClass: "col-xl-4 offset-xl-2 col-xxl-3 offset-xxl-2 col-lg-5 col-md-6",
  },
  {
    name: "Machines & Tools",
    tag: "distribution",
    title: "Sewing machines supplied to makers",
    img: "/assets/imgs/pages/work-6.jpg",
    w: 550,
    h: 400,
    titleFirst: false,
    itemClass: "alt-portfolio-item alt-portfolio-item-6 mb-30 at-hover-item",
    colClass: "col-xl-4 offset-xxl-8 offset-xl-8 col-lg-5 col-md-6",
  },
];

function Title({ name }: { name: string }) {
  return (
    <div className="alt-portfolio-content d-flex justify-content-between align-items-center mb-15">
      <h5 className="alt-portfolio-title mb-0">
        <Link className="common-underline" href="#work">
          {name}
        </Link>
      </h5>
      <span className="alt-portfolio-plus neutral-950">
        <PlusIcon />
      </span>
    </div>
  );
}

function Thumb({ item }: { item: Item }) {
  return (
    <Link className={`alt-portfolio-thumb p-relative fix d-block${item.titleFirst ? "" : " mb-15"}`} href="#work">
      <span className="w-100 d-block scale-img-from-to" data-value-1="1.5" data-value-2="1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={item.name} width={item.w} height={item.h} className="img-cover rounded-4" src={item.img} />
      </span>
      <div className={`alt-portfolio-btn ${item.btnClass ?? ""}`.trim()}>
        <div className="content">
          <span className="bg-transparent text-uppercase border px-3 py-1 rounded-pill text-white fz-font-label">{item.tag}</span>
          <h2 className="fw-400 fz-font-3xl text-white mb-0 mt-20">{item.title}</h2>
          <p className="text-white fz-font-md mb-0 mt-10 text-truncate-2 des">{DES}</p>
        </div>
      </div>
    </Link>
  );
}

function Card({ item }: { item: Item }) {
  return (
    <div className={item.colClass}>
      {item.cubes && (
        <div className="at-about-svg-wrap move-up">
          <CubeShapes />
        </div>
      )}
      <div className={item.itemClass}>
        {item.titleFirst ? (
          <>
            <Title name={item.name} />
            <Thumb item={item} />
          </>
        ) : (
          <>
            <Thumb item={item} />
            <div className="alt-portfolio-content d-flex justify-content-between align-items-center">
              <h5 className="alt-portfolio-title mb-0">
                <Link className="common-underline" href="#work">
                  {item.name}
                </Link>
              </h5>
              <span className="alt-portfolio-plus neutral-950">
                <PlusIcon />
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="container-2200" id="work">
      <div className="alt-portfolio-area portfolio-area bg-neutral-50 rounded-5 mx-lg-3 mx-2 pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-5 col-xl-5 col-md-8">
              <div className="alt-portfolio-main-title-wrap portfolio-text">
                <h1 className="alt-portfolio-main-title reveal-text fz-ds-1 fw-500">
                  Inside
                  <BigStar122 />
                  The
                  <br /> House
                  <BigArrow104 />
                </h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-xl-start justify-content-center">
            <Card item={ITEMS[0]} />
            <Card item={ITEMS[1]} />
          </div>
          <div className="row justify-content-xl-start justify-content-center">
            <Card item={ITEMS[2]} />
            <Card item={ITEMS[3]} />
          </div>
          <div className="row justify-content-xl-start justify-content-center">
            <Card item={ITEMS[4]} />
            <Card item={ITEMS[5]} />
          </div>
          <div className="row">
            <div className="col-xxl-4 col-lg-6 col-md-8 offset-xxl-4 offset-lg-3">
              <div className="mg-portfolio-title-wrap mb-30">
                <PrimaryLogoMark />
                <div className="at_fade_anim" data-delay=".3">
                  <p className="mg-portfolio-dec mb-30 fz-font-lg">
                    A look inside the house: the storefront, the gown wall, the sketch studio and the machines that keep
                    Delaware&apos;s makers sewing.
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

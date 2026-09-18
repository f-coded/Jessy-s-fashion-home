import AtBtn from "@/components/ui/AtBtn";
import SplitText from "@/components/ui/SplitText";

const SERVICES = [
  {
    title: "Personal Styling",
    desc: "Styling is where Jenny began. From a first consultation to the final fitting, she builds looks around who you are—your shape, your occasion, your story—so every piece feels unmistakably you.",
    listA: ["Style Consultations", "Wardrobe Edits & Capsules", "Event & Bridal Looks"],
    listB: ["Artist & Stage Styling", "Fittings & Alterations", "Shop-the-look Sourcing"],
    img: "/assets/imgs/pages/service-1.jpg",
  },
  {
    title: "Haute Couture",
    desc: "One-of-a-kind pieces, sketched, patterned and finished in the mannequin sketch studio. Statement gowns and custom silhouettes for clients, artists and red-carpet moments",
    listA: ["Sketch & Mood Boards", "Pattern Making", "Hand Finishing"],
    listB: ["Custom Gowns", "Fittings & Tailoring"],
    img: "/assets/imgs/pages/service-4.jpg",
  },
  {
    title: "Fabrics & RTW",
    desc: "The supply side of the house. Curated fabrics, textiles and ready-to-wear collections sourced for brands, designers and artists—delivered in the quantities you need, when you need them",
    listA: ["Fabrics & Textiles", "Ready-to-Wear Supply", "Trims, Threads & Notions"],
    listB: ["Bulk & Wholesale Orders", "Delivery Across Delaware & Beyond"],
    img: "/assets/imgs/pages/service-2.jpg",
  },
  {
    title: "Sewing Machines",
    desc: "Creative tools for every maker. Domestic and industrial sewing machines, sergers and accessories from the brands Jenny trusts—with guidance on the right machine for your work",
    listA: ["Domestic & Industrial Machines", "Sergers & Overlockers", "Presser Feet & Accessories"],
    listB: ["Setup & Guidance", "Bulk Supply for Studios"],
    img: "/assets/imgs/pages/service-3.jpg",
  },
];

/** Stacked, pinned service panels (`.scroll-section.vertical-section`). */
export default function Services() {
  return (
    <div className="container-2200" id="services">
      <section className="at-service-area bg-neutral-50 rounded-5 mx-lg-3 mx-2 pt-120 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="at-service-subtitle-wrap at-about-border d-flex justify-content-between gap-3 mb-50">
                <AtBtn as="span" className="common-black text-uppercase bg-transparent mb-10 rounded-0 p-0" textClassName="text-uppercase">
                  What we do
                </AtBtn>
                <span className="fs-font-md fw-500 text-decoration-underline">Styling · Distribution</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-section vertical-section position-relative">
          <div className="wrapper">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="item">
                <div className={`container bg-neutral-50 pt-20 ${i === SERVICES.length - 1 ? "pb-50" : "pb-40"}`}>
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-12">
                      <div className="d-flex flex-column justify-content-between h-100 py-4 px-2">
                        <h1 className="fz-ds-1 fw-500 text-scale-anim-2 pb-xxl-5 pb-4">{s.title}</h1>
                        <div className="d-xxl-flex align-items-end">
                          <p className="fz-font-2xl neutral-950 reveal-text pe-xxl-5 mb-3">
                            <SplitText text={s.desc} />
                          </p>
                          <div className="d-flex flex-column flex-md-row flex-xxl-column justify-content-between ps-xxl-5 ps-3">
                            <ul className="text-nowrap neutral-950">
                              {s.listA.map((l) => (
                                <li key={l}>{l}</li>
                              ))}
                            </ul>
                            <ul className="text-nowrap neutral-950">
                              {s.listB.map((l) => (
                                <li key={l}>{l}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                      <div className="rounded-4 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={s.title} width={600} height={400} className="img-cover" src={s.img} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import AtBtn from "@/components/ui/AtBtn";
import SplitText from "@/components/ui/SplitText";
import BtnGroup from "@/components/ui/BtnGroup";
import FullGalleryGrid from "@/components/gallery/FullGalleryGrid";
import { readGallery } from "@/lib/gallery";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Full Photo Gallery | Jenny's Fashion Home",
  description: "Browse the full visual collection of custom haute couture gowns, ready-to-wear fashion, boutique displays, and atelier craftsmanship at Jenny's Fashion Home in Harrington, Delaware.",
};

export default async function GalleryPage() {
  const uploadedItems = await readGallery();

  return (
    <main className="pt-85">
      {/* Hero Header Section */}
      <div className="container-2200" id="gallery-hero">
        <section className="text-white rounded-5 mx-lg-3 mx-2 pt-120 pb-100 position-relative overflow-hidden">
          {/* Boutique Backdrop Image with dark contrast overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100 z-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(15, 15, 15, 0.7) 0%, rgba(15, 15, 15, 0.85) 100%), url(/assets/imgs/store/boutique.jpg)",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="position-absolute top-0 start-0 w-100 h-100 opacity-10 pointer-events-none z-0"
            style={{ backgroundImage: "url(/assets/imgs/pages/noise.gif)" }}
          ></div>

          <div className="container position-relative z-1">
            <div className="row g-4 align-items-end">
              <div className="col-lg-7">
                <AtBtn as="span" className="text-white bg-transparent mb-15 rounded-0 p-0" textClassName="text-uppercase tracking-wider">
                  Visual Archive & Collection
                </AtBtn>
                <h1 className="fz-ds-1 fw-600 lh-1 mb-20 text-white">
                  <SplitText text="Explore Our Gallery" />
                </h1>
                <p className="fz-font-lg text-white-50 max-w-600 mb-0">
                  Step inside the boutique in Harrington, Delaware. Browse racks of ready-to-wear, haute couture gown wall, sketch studio, and latest client uploads.
                </p>
              </div>
              <div className="col-lg-5 text-lg-end d-flex flex-column align-items-lg-end gap-3">
                <div className="d-flex align-items-center gap-2 text-white-50 fz-font-sm">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-white">Gallery</span>
                </div>
                <BtnGroup href="/#footer" label="Book a Fitting" transparent fade={{ delay: ".3", from: "bottom", ease: "bounce" }} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Gallery Section with clear gap spacing */}
      <div className="container-2200 mt-50 mb-100">
        <section className="bg-neutral-50 rounded-5 mx-lg-3 mx-2 pt-80 pb-100">
          <div className="container">
            <FullGalleryGrid uploadedItems={uploadedItems} />
          </div>
        </section>
      </div>
    </main>
  );
}

import PageLoader from "@/components/layout/PageLoader";
import Header from "@/components/layout/Header";
import Offcanvas from "@/components/layout/Offcanvas";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import AnimationProvider from "@/components/animations/AnimationProvider";

/** Site chrome: loader, header, offcanvas, search, smooth-scroll wrapper, fixed footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="px-blur-bottom"></div>
      <PageLoader />
      <div id="top"></div>
      <Header />
      <Offcanvas />
      <div className="body-overlay sidebar-overlay" aria-hidden="true"></div>
      <SearchOverlay />
      <div id="smooth-wrapper">
        <div id="smooth-content" className="z-index-3">
          <main className="bg-neutral-0">{children}</main>
          <div className="footer-placeholder" aria-hidden="true"></div>
        </div>
        <Footer />
      </div>
      <BackToTop />
      <AnimationProvider />
    </>
  );
}

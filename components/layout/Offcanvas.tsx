import Logo from "./Logo";
import SocialGrid from "./SocialGrid";
import MobileNav from "./MobileNav";
import { CloseIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

const GALLERY = [1, 2, 3, 4, 5].map((n) => `/assets/imgs/pages/gallery-${n}.jpg`);

/** Right-side offcanvas opened by the header grid button. */
export default function Offcanvas() {
  return (
    <div className="at-offcanvas-area">
      <div className="at-offcanvas">
        <div className="at-offcanvas-top d-flex align-items-center justify-content-between">
          <Logo className="at-offcanvas-logo" />
          <div className="at-offcanvas-close-btn">
            <button type="button" className="close-btn close-sidebar" aria-label="Close">
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="at-offcanvas-content d-none d-xl-block">
          <h3 className="at-offcanvas-title">Welcome!</h3>
          <p className="fz-font-lg">
            Styling by Jenny, plus the fabrics, ready-to-wear and sewing machines that keep Delaware&apos;s brands, artists and
            makers creating.
          </p>
        </div>
        <div className="at-offcanvas-menu d-xl-none pb-50">
          <MobileNav />
        </div>
        <div className="at-offcanvas-gallery d-none d-xl-block">
          <div className="sec-2-home-5__avatars-row d-flex gap-2">
            {GALLERY.map((src) => (
              <div key={src} className="sec-2-home-5__avatar-sm at-offcanvas-gallery-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Inside Jenny's Fashion Home" width={65} height={65} />
              </div>
            ))}
          </div>
        </div>
        <div className="at-offcanvas-contact">
          <h5 className="at-offcanvas-title sm">Get in touch</h5>
          <ul>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                {SITE.phoneDisplay} (WhatsApp)
              </a>
            </li>
            <li>
              <a href={SITE.mailto}>{SITE.email}</a>
            </li>
            <li>
              <a href="#footer">{SITE.city}, USA</a>
            </li>
          </ul>
        </div>
        <div className="at-offcanvas-social">
          <h3 className="at-offcanvas-title sm">Follow Us</h3>
          <SocialGrid />
        </div>
      </div>
    </div>
  );
}

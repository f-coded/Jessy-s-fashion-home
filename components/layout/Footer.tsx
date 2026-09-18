import Link from "next/link";
import AtBtn from "@/components/ui/AtBtn";
import { SocialArrow } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";
import Logo from "./Logo";

const LINKS_A = [
  { label: "Home", href: "/" },
  { label: "About Jenny", href: "#about" },
  { label: "What We Do", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#footer" },
];
const LINKS_B = [
  { label: "Styling", href: "#services" },
  { label: "Haute Couture", href: "#services" },
  { label: "Fabrics & RTW", href: "#services" },
  { label: "Sewing Machines", href: "#services" },
];
const SOCIAL = ["Instagram", "TikTok", "Facebook", "Pinterest", "Youtube", "WhatsApp"];
const SERVICES = ["Haute Couture Styling", "Fabrics & Textiles", "Ready-to-Wear", "Sewing Machines"];

/** Fixed-bottom footer revealed as the page content scrolls away (scales 0.95 → 1). */
export default function Footer() {
  return (
    <footer className="footer-fixed-bottom bg-neutral-950 changeless" id="footer">
      <div className="at-footer-area mp-footer-style mp-footer-style-2 pt-120 pb-0">
        <div className="container">
          <div className="row g-5 pb-md-5 pb-2">
            <div className="col-lg-4">
              <div className="d-flex flex-wrap align-items-start gap-5">
                <Logo className="at-header-logo" tone="light" />
                <div className="d-flex flex-column gap-3">
                  <h6 className="text-white mb-2 fw-medium">
                    <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                      {SITE.phoneDisplay} · WhatsApp
                    </a>
                  </h6>
                  <h6 className="text-white mb-2">
                    <a href={SITE.mailto} className="text-white text-decoration-none">
                      {SITE.email}
                    </a>
                  </h6>
                  <h6 className="text-white mb-0">
                    {SITE.addressLine1}
                    <br />
                    {SITE.addressLine2}
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mx-auto">
              <div className="at-footer-widget alt-footer-link-item-wrap row">
                <div className="alt-footer-link-item col-6">
                  <ul>
                    {LINKS_A.map((l) => (
                      <li key={l.label} className="mb-15">
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="alt-footer-link-item col-6">
                  <ul>
                    {LINKS_B.map((l) => (
                      <li key={l.label} className="mb-15">
                        <Link href={l.href}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 flex-column justify-content-lg-end d-none d-md-flex">
              <p className="footer-2-follow-label text-white opacity-50 text-uppercase small mb-3">Follow Us</p>
              <div className="at-footer-widget at-footer-link">
                <div className="at-hero-social">
                  {SOCIAL.map((s) => (
                    <a key={s} href={s === "WhatsApp" ? SITE.whatsapp : "#"} target={s === "WhatsApp" ? "_blank" : undefined} rel="noopener noreferrer">
                      {s} <SocialArrow />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="footer-2-border pt-40 pb-40">
            <div className="row align-items-end g-4">
              <div className="col-lg-10 col-md-8">
                <span className="at-footer-copyright">Jenny&apos;s Fashion Home © 2026 · Harrington, Delaware</span>
                <div className="at-title-anim overflow-hidden">
                  <h2 className="footer-2-connect-title text-white mb-0 at-title-text text-scale-anim">Let&apos;s Connect</h2>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 text-end">
                <div className="d-flex flex-wrap align-items-end gap-4 gap-md-5 mb-3">
                  <div className="footer-2-hours text-white">
                    <span className="d-block fz-font-md opacity-50">Mon - Sat</span>
                    <h5 className="fw-400 common-white">9am - 6pm</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-none d-md-block">
              <div className="col-12">
                <ul className="d-flex flex-wrap gap-lg-4 gap-2 ps-3 pt-4 pb-2">
                  {SERVICES.map((s) => (
                    <li key={s}>
                      <AtBtn as="div" className="at-btn-border-white border-0 ps-2 pe-2 py-0 common-white opacity-50 bg-transparent rounded-0">
                        {s}
                      </AtBtn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

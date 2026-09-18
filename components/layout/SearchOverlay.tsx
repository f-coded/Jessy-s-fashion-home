"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import AtBtn from "@/components/ui/AtBtn";
import { XmarkIcon } from "@/components/ui/Icons";

const POPULAR = [
  "Personal Styling",
  "Haute Couture",
  "Gowns",
  "Fabrics",
  "Ready-to-Wear",
  "Sewing Machines",
  "Sergers",
  "Threads & Notions",
  "Bridal",
  "Artist Styling",
  "Alterations",
  "Wholesale",
];

/** Slide-down search panel opened by the header search button. */
export default function SearchOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector(".at-search-click, .search-btn");
    const onOpen = (e: Event) => {
      e.preventDefault();
      setOpen(true);
    };
    btn?.addEventListener("click", onOpen);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      btn?.removeEventListener("click", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <div className={`at-search-body-overlay ${open ? "active" : ""}`} role="button" tabIndex={0} aria-label="Close search" onClick={close}></div>
      <div className={`at-search-form-toggle ${open ? "active" : ""}`}>
        <div className="container">
          <div className="row mb-60">
            <div className="col-lg-12">
              <div className="at-search-top d-flex justify-content-between align-items-center">
                <Logo className="at-header-logo at-search-logo" />
                <button type="button" className="at-search-close" aria-label="Close search" onClick={close}>
                  <XmarkIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="at-search-form">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className="at-search-form-input">
                    <input type="text" placeholder="Find what you need…" required />
                    <span className="at-search-focus-border"></span>
                    <AtBtn as="button" type="submit" className="at-search-form-btn" iconClassName="icon-arrow-right" arrow="right">
                      Search
                    </AtBtn>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12">
              <div className="at-categories">
                <h3 className="at-categories-title">Popular searches</h3>
                <ul className="at-categories-list">
                  {POPULAR.map((p) => (
                    <li key={p}>
                      <a className="at-categories-item" href="#">
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

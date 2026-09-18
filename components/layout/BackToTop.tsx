"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "@/components/ui/Icons";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`back-to-top-wrapper ${show ? "back-to-top-btn-show" : ""}`}>
      <button
        type="button"
        className="back-to-top-btn"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp />
      </button>
    </div>
  );
}

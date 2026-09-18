"use client";

import { useEffect } from "react";

/**
 * Header interactions: the (mobile-only) grid button opens the right offcanvas nav
 * (`.at-offcanvas.opened` + `.body-overlay.apply`); overlay / close button dismiss it.
 */
export default function HeaderBehavior() {
  useEffect(() => {
    const menuBar = document.querySelector<HTMLElement>(".at-menu-bar");
    const offcanvas = document.querySelector<HTMLElement>(".at-offcanvas");
    const overlay = document.querySelector<HTMLElement>(".body-overlay");
    const closeBtn = document.querySelector<HTMLElement>(".at-offcanvas .close-btn");
    const open1 = (e: Event) => {
      e.preventDefault();
      offcanvas?.classList.add("opened");
      overlay?.classList.add("apply");
    };
    const close1 = () => {
      offcanvas?.classList.remove("opened");
      overlay?.classList.remove("apply");
    };
    menuBar?.addEventListener("click", open1);
    closeBtn?.addEventListener("click", close1);
    overlay?.addEventListener("click", close1);

    return () => {
      menuBar?.removeEventListener("click", open1);
      closeBtn?.removeEventListener("click", close1);
      overlay?.removeEventListener("click", close1);
    };
  }, []);
  return null;
}

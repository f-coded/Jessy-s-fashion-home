"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Header interactions: the (mobile-only) grid button opens the right offcanvas nav
 * (`.at-offcanvas.opened` + `.body-overlay.apply`); overlay / close button / link clicks / route changes dismiss it.
 */
export default function HeaderBehavior() {
  const pathname = usePathname();

  const closeOffcanvas = useCallback(() => {
    const offcanvas = document.querySelector<HTMLElement>(".at-offcanvas");
    const overlay = document.querySelector<HTMLElement>(".body-overlay");
    offcanvas?.classList.remove("opened");
    overlay?.classList.remove("apply");
  }, []);

  // Automatically close offcanvas whenever page route changes
  useEffect(() => {
    closeOffcanvas();
  }, [pathname, closeOffcanvas]);

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

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      // Don't close when expanding dropdown toggles
      if (link && !link.closest(".has-dropdown > a")) {
        closeOffcanvas();
      }
    };

    menuBar?.addEventListener("click", open1);
    closeBtn?.addEventListener("click", closeOffcanvas);
    overlay?.addEventListener("click", closeOffcanvas);
    offcanvas?.addEventListener("click", handleLinkClick);

    return () => {
      menuBar?.removeEventListener("click", open1);
      closeBtn?.removeEventListener("click", closeOffcanvas);
      overlay?.removeEventListener("click", closeOffcanvas);
      offcanvas?.removeEventListener("click", handleLinkClick);
    };
  }, [closeOffcanvas]);

  return null;
}

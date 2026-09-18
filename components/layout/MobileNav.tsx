"use client";

import { useEffect, useRef } from "react";
import NavMenu from "./NavMenu";

/**
 * The template clones the desktop nav into each offcanvas and turns dropdowns into
 * height-animated accordions. This renders the same markup and behavior directly.
 */
export default function MobileNav() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    // Insert the "+" toggle buttons after each submenu (like the template does at runtime)
    nav.querySelectorAll<HTMLElement>(".at-submenu").forEach((sub) => {
      const li = sub.parentElement;
      if (!li || li.querySelector("button.at-menu-close")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "at-menu-close";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Toggle submenu");
      btn.innerHTML = '<i>+</i>';
      li.appendChild(btn);
      sub.style.display = "none";
    });

    const toggle = (li: HTMLElement) => {
      const sub = li.querySelector<HTMLElement>(".at-submenu");
      if (!sub) return;
      const wasActive = li.classList.contains("active");
      li.classList.toggle("active");
      const btn = li.querySelector<HTMLElement>("button.at-menu-close");
      btn?.setAttribute("aria-expanded", String(!wasActive));
      if (wasActive) {
        sub.style.overflow = "hidden";
        sub.style.transition = "height 0.3s linear";
        const h = sub.scrollHeight;
        sub.style.height = `${h}px`;
        void sub.offsetHeight;
        requestAnimationFrame(() => {
          sub.style.height = "0px";
          const end = () => {
            sub.style.display = "none";
            sub.style.transition = "none";
            sub.style.height = "";
            sub.style.overflow = "";
            sub.removeEventListener("transitionend", end);
          };
          sub.addEventListener("transitionend", end);
        });
      } else {
        sub.style.display = "block";
        sub.style.overflow = "hidden";
        sub.style.transition = "height 0.3s linear";
        const h = sub.scrollHeight;
        sub.style.height = "0px";
        void sub.offsetHeight;
        requestAnimationFrame(() => {
          sub.style.height = `${h}px`;
          const end = () => {
            sub.style.transition = "none";
            sub.style.height = "";
            sub.style.overflow = "";
            sub.removeEventListener("transitionend", end);
          };
          sub.addEventListener("transitionend", end);
        });
      }
    };

    const onClick = (e: Event) => {
      e.preventDefault();
      const t = e.target as HTMLElement;
      const btn = t.closest("button.at-menu-close");
      const link = t.closest(".has-dropdown > a");
      const li = (btn?.parentElement || link?.closest("li.has-dropdown")) as HTMLElement | null;
      if (li && li.querySelector(".at-submenu")) toggle(li);
    };
    const targets = nav.querySelectorAll("button.at-menu-close, ul > li.has-dropdown > a");
    targets.forEach((el) => el.addEventListener("click", onClick));
    return () => targets.forEach((el) => el.removeEventListener("click", onClick));
  }, []);

  return (
    <nav ref={ref}>
      <NavMenu swap={false} />
    </nav>
  );
}

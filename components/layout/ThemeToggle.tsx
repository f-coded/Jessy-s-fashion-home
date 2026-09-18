"use client";

import { useCallback, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

type Theme = "light" | "dark";

function readTheme(): Theme {
  try {
    const attr = document.documentElement.getAttribute("data-bs-theme");
    if (attr === "light" || attr === "dark") return attr;
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

/** Moon/sun switch that flips `data-bs-theme` on <html> and persists to localStorage. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    queueMicrotask(() => setTheme(readTheme()));
    const mo = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-bs-theme");
      if (t === "light" || t === "dark") setTheme((p) => (p === t ? p : t));
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });
    return () => mo.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      document.documentElement.setAttribute("data-bs-theme", next);
      localStorage.setItem("theme", next);
    } catch (e) {
      console.warn("Error applying theme:", e);
    }
  }, [theme]);

  return (
    <label htmlFor="switch" className="toggle dark-light-switcher">
      <input type="checkbox" className="input" id="switch" checked={theme === "dark"} onChange={toggle} />
      <div className="icon icon--moon">
        <MoonIcon />
      </div>
      <div className="icon icon--sun">
        <SunIcon />
      </div>
    </label>
  );
}

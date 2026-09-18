/**
 * `.hover-effect-1` (blog thumbnails): zoom + slight rotate + saturation boost,
 * with a soft gradient overlay fading in — exactly the template's "zoomMorph" effect.
 */
export function initHoverEffects(): () => void {
  const cleanups: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>(".hover-effect-1").forEach((wrap) => {
    const img = wrap.querySelector<HTMLImageElement>("img");
    if (!img) return;
    let timer: number | null = null;
    const enter = () => {
      img.style.transform = "scale(1.05) rotate(1deg)";
      img.style.filter = "brightness(1.1) contrast(1.1) saturate(1.2)";
      img.style.borderRadius = "16px";
      const overlay = document.createElement("div");
      overlay.className = "zoom-overlay";
      Object.assign(overlay.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(0,0,0,0.1))",
        opacity: "0",
        transition: "opacity 0.6s",
        pointerEvents: "none",
        borderRadius: "inherit",
      });
      wrap.appendChild(overlay);
      timer = window.setTimeout(() => (overlay.style.opacity = "1"), 100);
    };
    const leave = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
      img.style.transform = "";
      img.style.filter = "";
      img.style.borderRadius = "";
      wrap.querySelectorAll(".zoom-overlay").forEach((o) => o.remove());
    };
    wrap.addEventListener("mouseenter", enter);
    wrap.addEventListener("mouseleave", leave);
    cleanups.push(() => {
      if (timer) window.clearTimeout(timer);
      wrap.removeEventListener("mouseenter", enter);
      wrap.removeEventListener("mouseleave", leave);
      wrap.querySelectorAll(".zoom-overlay").forEach((o) => o.remove());
    });
  });
  return () => cleanups.forEach((c) => c());
}

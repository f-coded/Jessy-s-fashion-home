import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Cfg = { center: { scaleY: number; y: string }; neighbor: { scaleY: number; y: string } };

/**
 * `.text-scale-anim` / `.text-scale-anim-2`: wraps every letter in a span; hovering a letter
 * stretches it (scaleY) and slightly stretches its two neighbours.
 */
function letterHover(selector: string, doneAttr: string, cfg: Cfg): () => void {
  const cleanups: Array<() => void> = [];
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    if (el.hasAttribute(doneAttr) || el.querySelector(".at-letter-span")) return;
    const nodes: Node[] = [];
    el.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        (n.textContent?.split(" ") ?? []).forEach((word, i, arr) => {
          const w = document.createElement("span");
          w.classList.add("at-word-span");
          word.split("").forEach((ch) => {
            const s = document.createElement("span");
            s.classList.add("at-letter-span");
            s.textContent = ch;
            w.appendChild(s);
          });
          nodes.push(w);
          if (i < arr.length - 1) nodes.push(document.createTextNode(" "));
        });
      } else if (n.nodeType === Node.ELEMENT_NODE) nodes.push(n.cloneNode(true));
    });
    el.innerHTML = "";
    nodes.forEach((n) => el.appendChild(n));
    el.setAttribute(doneAttr, "true");

    const letters = el.querySelectorAll<HTMLElement>(".at-letter-span");
    letters.forEach((letter, i) => {
      const enter = () => {
        gsap.to(letter, { scaleY: cfg.center.scaleY, y: cfg.center.y, duration: 0.4, ease: "sine" });
        [letters[i - 1], letters[i + 1]].forEach((n) => n && gsap.to(n, { scaleY: cfg.neighbor.scaleY, y: cfg.neighbor.y, duration: 0.4, ease: "sine" }));
      };
      const leave = () => {
        gsap.to(letter, { scaleY: 1, y: "0%", duration: 0.4, ease: "sine" });
        [letters[i - 1], letters[i + 1]].forEach((n) => n && gsap.to(n, { scaleY: 1, y: "0%", duration: 0.4, ease: "sine" }));
      };
      letter.addEventListener("mouseenter", enter);
      letter.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        letter.removeEventListener("mouseenter", enter);
        letter.removeEventListener("mouseleave", leave);
      });
    });
  });
  return () => cleanups.forEach((c) => c());
}

/**
 * - `.at-title-text`: split into `.char` spans with `--char` index (CSS-driven hover wave)
 * - `.reveal-text .split-char`: scrubbed opacity/x reveal on scroll
 * - `.text-scale-anim(-2)`: letter hover stretch
 */
export function initTextAnimations(): () => void {
  const triggers: ScrollTrigger[] = [];

  document.querySelectorAll<HTMLElement>(".at-title-text").forEach((el) => {
    if (el.hasAttribute("data-at-title-text-done")) return;
    const text = el.textContent?.trim() ?? "";
    el.setAttribute("aria-label", text);
    // Split text nodes into `.char` spans but keep inline elements (e.g. the <sup>®</sup>) intact.
    let idx = 0;
    const splitNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of node.textContent ?? "") {
          const s = document.createElement("span");
          s.className = "char";
          s.setAttribute("aria-hidden", "true");
          s.style.setProperty("--char", String(++idx));
          s.textContent = ch === " " ? " " : ch;
          frag.appendChild(s);
        }
        node.parentNode?.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName !== "SUP") {
        Array.from(node.childNodes).forEach(splitNode);
      }
    };
    Array.from(el.childNodes).forEach(splitNode);
    el.setAttribute("data-at-title-text-done", "true");
  });

  document.querySelectorAll<HTMLElement>(".reveal-text").forEach((el) => {
    if (el.hasAttribute("data-reveal-text-done")) return;
    const chars = Array.from(el.querySelectorAll(".split-char"));
    if (!chars.length) return;
    el.setAttribute("data-reveal-text-done", "true");
    gsap.set(chars, { opacity: 0.3, x: -7 });
    const tw = gsap.to(chars, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.02,
      scrollTrigger: { trigger: el, start: "top 80%", end: "top 20%", scrub: 1 },
    });
    if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
  });

  const hovers = [
    letterHover(".text-scale-anim", "data-text-scale-anim-done", { center: { scaleY: 1.6, y: "-24%" }, neighbor: { scaleY: 1.3, y: "-12%" } }),
    letterHover(".text-scale-anim-2", "data-text-scale-anim-2-done", { center: { scaleY: 1.3, y: "-14%" }, neighbor: { scaleY: 1.1, y: "-5%" } }),
  ];

  return () => {
    triggers.forEach((t) => t.kill());
    hovers.forEach((h) => h());
    document.querySelectorAll(".reveal-text").forEach((e) => e.removeAttribute("data-reveal-text-done"));
  };
}

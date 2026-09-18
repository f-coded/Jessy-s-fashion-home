import Link from "next/link";
import { ArrowBend16, ArrowBend24 } from "./Icons";

type Props = {
  href: string;
  label: string;
  transparent?: boolean;
  fade?: { delay?: string; from?: string; ease?: string };
};

/**
 * `.at-btn-group` — circle arrow + pill + circle arrow that morph on hover.
 * Wrapped in `.at_fade_anim` so the generic fade-in ScrollTrigger picks it up.
 */
export default function BtnGroup({ href, label, transparent, fade = { delay: ".4", from: "bottom", ease: "bounce" } }: Props) {
  const Arrow = transparent ? ArrowBend24 : ArrowBend16;
  return (
    <div
      className={`at-btn-group ${transparent ? "at-btn-group-transparent " : ""}at_fade_anim`}
      data-delay={fade.delay}
      data-fade-from={fade.from}
      data-ease={fade.ease}
    >
      <Link className="at-btn-circle" aria-label="Previous" href={href}>
        <Arrow />
      </Link>
      <Link className="at-btn z-index-1" href={href}>
        {label}
      </Link>
      <Link className="at-btn-circle" aria-label="Next" href={href}>
        <Arrow />
      </Link>
    </div>
  );
}

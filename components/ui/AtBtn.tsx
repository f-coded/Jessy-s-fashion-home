import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight11, ArrowRight14 } from "./Icons";

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  as?: "a" | "span" | "div" | "button";
  textClassName?: string;
  iconClassName?: string;
  arrow?: "up-right" | "right";
  type?: "button" | "submit";
  ariaLabel?: string;
  target?: string;
};

/**
 * `.at-btn` — the template's dual-text hover button:
 * text-1 slides up while text-2 slides in from below, and the arrow icon
 * swaps with a diagonal translate (see `.at-btn:hover` rules in theme.css).
 */
export default function AtBtn({
  children,
  href,
  className = "",
  as,
  textClassName = "",
  iconClassName = "",
  arrow = "up-right",
  type,
  ariaLabel,
  target,
}: Props) {
  const Icon = arrow === "right" ? ArrowRight14 : ArrowUpRight11;
  const inner = (
    <>
      <span className={textClassName || undefined}>
        <span className="text-1">{children}</span>
        <span className="text-2">{children}</span>
      </span>
      <i className={iconClassName || undefined}>
        <Icon />
        <Icon />
      </i>
    </>
  );
  const cls = `at-btn ${className}`.trim();

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a className={cls} href={href} target={target} rel={target ? "noopener noreferrer" : undefined}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {inner}
      </Link>
    );
  }
  const Tag = as ?? "span";
  if (Tag === "button") {
    return (
      <button className={cls} type={type ?? "button"} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }
  return <Tag className={cls}>{inner}</Tag>;
}

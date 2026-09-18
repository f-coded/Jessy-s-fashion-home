import Link from "next/link";

/**
 * Wordmark that mirrors the storefront signage: gold silhouette + "Jenny's" in script
 * over a letter-spaced "FASHION HOME".
 */
export default function Logo({
  className = "at-header-logo",
  tone = "auto",
}: {
  className?: string;
  /** `light` forces white/gold (footer, loader); `auto` follows the theme. */
  tone?: "auto" | "light";
}) {
  return (
    <div className={className}>
      <Link href="/" className={`brand-logo${tone === "light" ? " brand-logo--light" : ""}`} aria-label="Jenny's Fashion Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brand-logo__mark" alt="" width={40} height={60} src="/assets/imgs/logo/favicon.svg" />
        <span className="brand-logo__text">
          <span className="brand-logo__script">Jenny&apos;s</span>
          <span className="brand-logo__sub">Fashion Home</span>
        </span>
      </Link>
    </div>
  );
}

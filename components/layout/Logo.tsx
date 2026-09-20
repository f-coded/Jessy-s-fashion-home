import Link from "next/link";

/**
 * Official Brand Logo Component: Gold metallic script & silhouette logo graphic.
 */
export default function Logo({
  className = "at-header-logo",
  height = 46,
}: {
  className?: string;
  tone?: "auto" | "light";
  height?: number;
}) {
  return (
    <div className={className}>
      <Link href="/" className="brand-logo-link d-inline-flex align-items-center" aria-label="Jenny's Fashion Home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="brand-logo__img"
          alt="Jenny's Fashion Home"
          style={{ height: `${height}px`, width: "auto", objectFit: "contain" }}
          src="/assets/imgs/logo/brand-logo.png"
        />
      </Link>
    </div>
  );
}

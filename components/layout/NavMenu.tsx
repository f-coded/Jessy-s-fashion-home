import Link from "next/link";
import { NAV } from "./navData";
import { ArrowUpRight13 } from "@/components/ui/Icons";

/**
 * Desktop nav markup (`.at-main-menu nav ul li.has-dropdown > a + .submenu`).
 * `swap` renders the dual-text `.at-link-swap` hover; the offcanvas clones use plain text.
 */
export default function NavMenu({ swap = true }: { swap?: boolean }) {
  return (
    <ul>
      {NAV.map((item) => {
        const hasDrop = !!(item.mega || item.submenu);
        return (
          <li key={item.label} className={hasDrop ? "has-dropdown" : undefined}>
            <Link href={item.href}>
              {swap ? (
                <span className="at-link-swap">
                  <span className="text-1">{item.label}</span>
                  <span className="text-2">{item.label}</span>
                </span>
              ) : (
                item.label
              )}
            </Link>
            {item.mega && (
              <div className="at-submenu submenu at-megamenu">
                <div className="row">
                  {item.mega.map((col) => (
                    <div key={col.title} className={item.mega!.length === 2 ? "col-xl-6" : "col-xl-4"}>
                      <div className="at-megamenu-box">
                        <div className="at-megamenu-title-wrap">
                          <span className="at-megamenu-title">{col.title}</span>
                          <ArrowUpRight13 />
                        </div>
                        <ul>
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link href={l.href}>{l.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.submenu && (
              <ul className="at-submenu submenu">
                {item.submenu.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

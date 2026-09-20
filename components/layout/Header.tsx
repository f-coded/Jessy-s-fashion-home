import Logo from "./Logo";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";
import HeaderBehavior from "./HeaderBehavior";
import { GridIcon18 } from "@/components/ui/Icons";

export default function Header() {
  return (
    <header>
      <div className="at-header-area at-header-spacing header-transparent">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3 col-7">
              <Logo />
            </div>
            <div className="col-xl-6 mx-auto d-none d-xl-flex justify-content-center">
              <div className="at-main-menu d-inline-flex justify-content-center">
                <nav className="at-mobile-menu-active">
                  <NavMenu />
                </nav>
              </div>
            </div>
            <div className="col-xl-3 col-5">
              <div className="at-header-right gap-3 d-flex justify-content-end align-items-center">
                <div className="dark-light-mode">
                  <ThemeToggle />
                </div>
                <button type="button" className="at-menu-bar at-header-sidebar-btn d-xl-none" aria-label="Open menu">
                  <GridIcon18 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeaderBehavior />
    </header>
  );
}

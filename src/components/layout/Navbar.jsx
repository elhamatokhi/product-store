import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, toggleCart } from "../../features/cart/cartSlice";
import PreferenceControls from "../settings/PreferenceControls";

function NavItems({ items, onNavigate }) {
  return items.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `rounded-md px-3 py-2 text-sm font-bold transition ${
          isActive
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
        }`
      }
    >
      {item.label}
    </NavLink>
  ));
}

function Navbar() {
  const { t } = useTranslation();
  // Mobile navigation state stays local because it only controls the responsive menu shell.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartDispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const navItems = [
    { to: "/", label: t("navbar.products") },
    { to: "/settings", label: t("navbar.settings") },
  ];

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleCartClick() {
    closeMenu();
    cartDispatch(toggleCart());
  }

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          className="text-lg font-black text-stone-950 no-underline dark:text-white"
          to="/"
          onClick={closeMenu}
        >
          {t("app.brand")}
        </Link>

        <nav className="hidden items-center gap-3 md:flex" aria-label={t("navbar.menu")}>
          <NavItems items={navItems} />
          <PreferenceControls compact />
          <button
            type="button"
            className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-900"
            onClick={handleCartClick}
          >
            {t("navbar.cart")} {cartCount}
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-900 transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:hover:bg-stone-800 md:hidden"
          aria-label={isMenuOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {isMenuOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
          </span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-stone-200 bg-stone-50 transition-all duration-200 dark:border-stone-800 dark:bg-stone-950 md:hidden ${
          isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="grid gap-3 px-4 py-4" aria-label={t("navbar.menu")}>
          <NavItems items={navItems} onNavigate={closeMenu} />
          <button
            type="button"
            className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-800"
            onClick={handleCartClick}
          >
            {t("navbar.cart")} {cartCount}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

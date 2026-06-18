"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav, servicesMenu, servicesFeatured } from "@/content/site";
import { ArrowRight, ChevronDown, ChevronRight, Close, Menu } from "@/components/ui/icons";
import logoDark from "../../../public/brand/beam-logo.png";
import logoWhite from "../../../public/brand/beam-logo-light.png";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Solid header after a short scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Esc closes everything.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Header is always solid (white), including over the hero video.
  const onLight = true;

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper transition-colors duration-200 ${
        scrolled ? "border-ink/10" : ""
      }`}
    >
      {/* PwC-style bar: logo left · nav centred · Get in touch right.
          grid-cols-[1fr_auto_1fr] keeps the nav optically centred on the page
          regardless of the logo/button widths. Mobile falls back to a simple
          logo + hamburger row. */}
      <div className="container-page flex h-[var(--header-h,88px)] items-center justify-between gap-6 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo — left */}
        <Link
          href="/"
          aria-label="Beam Global Services, home"
          className="flex shrink-0 items-center lg:justify-self-start"
        >
          <Image
            src={onLight ? logoDark : logoWhite}
            alt="Beam Global Services"
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        {/* Desktop nav — centred */}
        <nav aria-label="Primary" className="hidden items-center justify-center gap-8 lg:flex">
          {/* Services with mega-menu */}
          <div className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => setMegaOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-[0.95rem] font-medium transition-colors ${
                onLight ? "text-ink hover:text-accent" : "text-paper hover:text-gold"
              }`}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {primaryNav
            .filter((l) => l.label !== "Services")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`link-underline text-[0.95rem] font-medium transition-colors ${
                  onLight ? "text-ink hover:text-accent" : "text-paper hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Right cluster — Get in touch (desktop) + mobile toggle */}
        <div className="flex items-center justify-end gap-4 lg:justify-self-end">
          <Link
            href="/contact"
            className="hidden bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink lg:inline-flex"
          >
            Get in touch
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`lg:hidden ${onLight ? "text-ink" : "text-paper"}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mega-menu panel */}
      {megaOpen && (
        <div
          className="absolute inset-x-0 top-full hidden border-b border-hairline bg-paper lg:block"
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
        >
          <div className="container-page py-10">
            {/* header row */}
            <div className="mb-8 flex items-center justify-between border-b border-hairline pb-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                Services
              </h2>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-ink"
              >
                See all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* PwC-style: link columns on the left, a divided Featured column
                with large landscape thumbnails on the right. */}
            <div className="flex gap-12">
              {/* Service link groups — one column per group */}
              <div
                className="grid flex-1 gap-x-8 gap-y-2"
                style={{
                  gridTemplateColumns: `repeat(${servicesMenu.length}, minmax(0, 1fr))`,
                }}
              >
                {servicesMenu.map((group) => (
                  <div key={group.label}>
                    <Link
                      href={group.href}
                      className="text-eyebrow mb-4 inline-block px-4 text-accent transition-colors hover:text-accent-ink"
                    >
                      {group.label}
                    </Link>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="group/item flex items-center justify-between gap-4 rounded-sm px-4 py-3 text-[1.0625rem] font-medium text-ink transition-colors duration-150 hover:bg-accent hover:text-paper"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover/item:text-paper" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured — right column, large landscape thumbnails */}
              <div className="w-[34%] shrink-0 border-l border-hairline pl-10">
                <p className="text-eyebrow mb-5 text-muted">Featured</p>
                <ul className="space-y-5">
                  {servicesFeatured.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href} className="group flex items-center gap-4">
                        <span className="relative aspect-[16/10] w-36 shrink-0 overflow-hidden rounded">
                          <Image
                            src={f.image}
                            alt=""
                            fill
                            sizes="160px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </span>
                        <span className="text-[1.0625rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                          {f.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>

    {/* Mobile drawer — rendered OUTSIDE the backdrop-blur header so its
        fixed positioning covers the full viewport, not just the header box. */}
    {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  return (
    <div className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-paper text-ink lg:hidden">
      <div className="container-page flex h-[88px] items-center justify-between border-b border-hairline">
        <Link href="/" aria-label="Beam Global Services, home" onClick={onClose}>
          <Image src={logoDark} alt="Beam Global Services" className="h-9 w-auto" />
        </Link>
        <button type="button" aria-label="Close menu" onClick={onClose} className="text-ink">
          <Close className="h-7 w-7" />
        </button>
      </div>
      <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto py-6">
        <div className="border-b border-hairline py-3">
          <button
            type="button"
            className="flex w-full items-center justify-between font-display text-xl font-bold"
            aria-expanded={servicesExpanded}
            onClick={() => setServicesExpanded((v) => !v)}
          >
            Services
            <ChevronDown
              className={`h-5 w-5 transition-transform ${servicesExpanded ? "rotate-180" : ""}`}
            />
          </button>
          {servicesExpanded && (
            <div className="mt-3 space-y-5 pb-2">
              {servicesMenu.map((group) => (
                <div key={group.label}>
                  <p className="text-eyebrow mb-2 text-accent">{group.label}</p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block py-1.5 text-muted hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {primaryNav
          .filter((l) => l.label !== "Services")
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block border-b border-hairline py-4 font-display text-xl font-bold"
            >
              {link.label}
            </Link>
          ))}
        <Link
          href="/careers"
          onClick={onClose}
          className="block border-b border-hairline py-4 font-display text-xl font-bold"
        >
          Careers
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="mt-6 inline-flex bg-accent px-6 py-3.5 font-semibold text-paper"
        >
          Get in touch
        </Link>
      </nav>
    </div>
  );
}

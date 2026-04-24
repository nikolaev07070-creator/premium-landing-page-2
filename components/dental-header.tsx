"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "ГЛАВНАЯ" },
  { href: "/#about", label: "О НАС" },
  { href: "/#services", label: "УСЛУГИ" },
  { href: "/#equipment", label: "ОБОРУДОВАНИЕ" },
  { href: "/#team", label: "КОМАНДА" },
  { href: "/portfolio", label: "ПОРТФОЛИО" },
  { href: "/#price", label: "ПРАЙС" },
  { href: "/contacts", label: "КОНТАКТЫ" },
];

export function DentalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-500 backdrop-blur-md bg-black/40 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto max-w-full px-4 sm:px-5">
        <div className="flex min-w-0 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 p-0">
              <Image
                src="/lab/logo.png"
                alt="Esthetic Dental Lab Logo"
                width={48}
                height={48}
                className="w-[132%] h-[132%] object-contain scale-[1.32] origin-center"
                priority
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-base font-normal leading-tight tracking-tight text-foreground sm:text-lg">
                ESTHETIC
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider sm:text-xs">
                Dental Lab
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Button asChild className="glow-button bg-primary text-primary-foreground px-6">
              <Link href="/contacts">ЗАЯВКА</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-white/5 lg:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Brand Subtitle - растянутый по ширине меню */}
        <div className="hidden lg:flex items-center justify-center w-full mt-3">
          <div className="w-full max-w-7xl px-4 flex items-center justify-center">
            <span className="text-[1.08rem] md:text-[1.22rem] text-white uppercase tracking-[0.1em] whitespace-nowrap text-center brand-glow">
              ESTHETIC DENTAL LAB • DIGITAL CAD/CAM STUDIO
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 max-h-[min(75dvh,560px)] overflow-y-auto overscroll-contain border-t border-border/30 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] lg:hidden motion-reduce:transition-none animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-lg px-2 py-3 text-base font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground active:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="glow-button mt-3 h-12 w-full bg-primary text-primary-foreground text-base shrink-0">
                <Link href="/contacts" onClick={() => setIsMobileMenuOpen(false)}>
                  ЗАЯВКА
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

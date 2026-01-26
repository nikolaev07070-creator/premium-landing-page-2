"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 backdrop-blur-md bg-black/40 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-foreground font-normal text-2xl">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-normal tracking-tight leading-tight">
                <span className="text-foreground">ESTHETIC</span>
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
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
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          <div className="lg:hidden mt-4 pb-4 border-t border-border/30">
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="glow-button bg-primary text-primary-foreground mt-4">
                <Link href="/contacts" onClick={() => setIsMobileMenuOpen(false)}>ЗАЯВКА</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

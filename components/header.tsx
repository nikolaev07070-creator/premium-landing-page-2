"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/cars", label: "Автопарк" },
  { href: "/availability", label: "Календарь" },
  { href: "/terms", label: "Условия" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="gold-text font-bold text-xl">А</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              <span className="gold-text">Томск</span>
              <span className="text-foreground">Драйв</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+79181234567"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+7 918 123-45-67</span>
            </a>
            <a
              href="https://wa.me/79181234567"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Button asChild className="glow-button bg-primary text-primary-foreground">
              <Link href="/cars">Подобрать авто</Link>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/30">
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <a
                  href="tel:+79181234567"
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  +7 918 123-45-67
                </a>
              </div>
              <Button asChild className="glow-button bg-primary text-primary-foreground mt-2">
                <Link href="/cars">Подобрать авто</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

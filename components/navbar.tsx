"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Equipment", href: "#equipment" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
              <span className="gold-text text-lg font-semibold">PD</span>
            </div>
            <span className="text-xl font-light tracking-wide text-foreground">
              Precision<span className="gold-text font-medium">Dental</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-light tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button className="glow-button bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isOpen && (
          <div className="glass mt-4 rounded-xl p-6 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-light tracking-wide text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <Button className="glow-button mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

const footerLinks = {
  services: [
    { name: "Crown & Bridge", href: "#services" },
    { name: "Implant Prosthetics", href: "#services" },
    { name: "Removables", href: "#services" },
    { name: "Digital Design", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#team" },
    { name: "Equipment", href: "#equipment" },
    { name: "Careers", href: "#" },
  ],
  resources: [
    { name: "Case Submission", href: "#" },
    { name: "RX Forms", href: "#" },
    { name: "Shade Guide", href: "#" },
    { name: "CE Courses", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/30 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <span className="gold-text text-lg font-semibold">PD</span>
              </div>
              <span className="text-xl font-light tracking-wide text-foreground">
                Precision<span className="gold-text font-medium">Dental</span>
              </span>
            </a>
            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Premium dental laboratory services combining cutting-edge
              technology with master craftsmanship. Your partner in creating
              exceptional smiles.
            </p>
            <div className="flex gap-4">
              {["LinkedIn", "Instagram", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-secondary/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                  aria-label={social}
                >
                  <span className="text-xs font-light">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-foreground uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-foreground uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-foreground uppercase">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-light text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
          <p className="text-sm font-light text-muted-foreground">
            &copy; {new Date().getFullYear()} Precision Dental Lab. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm font-light text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm font-light text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Crown & Bridge",
    description:
      "Premium PFM, full zirconia, and e.max crowns with exceptional aesthetics and fit. Multi-unit bridges crafted with precision for optimal function.",
    features: ["Zirconia", "E.max", "PFM", "Implant Supported"],
  },
  {
    number: "02",
    title: "Implant Prosthetics",
    description:
      "Custom abutments, screw-retained crowns, and full-arch solutions. Compatible with all major implant systems worldwide.",
    features: ["Custom Abutments", "Screw-Retained", "Full Arch", "Hybrid Dentures"],
  },
  {
    number: "03",
    title: "Removable Prosthetics",
    description:
      "Full and partial dentures with premium teeth and natural gingival characterization. Flexible partials and implant overdentures.",
    features: ["Full Dentures", "Partial Dentures", "Flexible Partials", "Overdentures"],
  },
  {
    number: "04",
    title: "Digital Smile Design",
    description:
      "Advanced digital planning for veneers, smile makeovers, and complex rehabilitations. 3D visualization before treatment begins.",
    features: ["Veneers", "Smile Makeover", "3D Planning", "Wax-up Preview"],
  },
  {
    number: "05",
    title: "Orthodontic Appliances",
    description:
      "Clear aligners, retainers, and functional appliances. Precision-milled splints and night guards for optimal patient comfort.",
    features: ["Clear Aligners", "Retainers", "Night Guards", "Splints"],
  },
  {
    number: "06",
    title: "Surgical Guides",
    description:
      "Digitally designed and 3D-printed surgical guides for precise implant placement. Full integration with CBCT data.",
    features: ["Implant Guides", "3D Printed", "CBCT Integration", "Stackable Guides"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-primary uppercase">
            Our Services
          </span>
          <h2 className="mb-6 text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Comprehensive <span className="gold-text">solutions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            From simple single-unit restorations to complex full-mouth
            rehabilitations, we deliver excellence at every level.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.number}
              className="glass-card group cursor-pointer rounded-2xl p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="gold-text text-4xl font-extralight">
                  {service.number}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h3 className="mb-3 text-xl font-normal text-foreground">
                {service.title}
              </h3>
              <p className="mb-6 text-sm font-light leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs font-light text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

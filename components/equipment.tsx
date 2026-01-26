"use client";

import { Check } from "lucide-react";

const equipment = [
  {
    category: "Milling Systems",
    items: [
      { name: "Roland DWX-52D", spec: "5-axis wet/dry milling" },
      { name: "Imes-Icore 350i", spec: "High-speed zirconia milling" },
      { name: "VHF K5", spec: "Precision titanium processing" },
    ],
  },
  {
    category: "3D Printing",
    items: [
      { name: "Formlabs Form 3B+", spec: "Dental-grade resin printing" },
      { name: "SprintRay Pro 95", spec: "High-speed surgical guides" },
      { name: "Asiga Max UV", spec: "Ultra-precise model printing" },
    ],
  },
  {
    category: "Scanning Technology",
    items: [
      { name: "3Shape E4", spec: "Laboratory desktop scanner" },
      { name: "Medit T710", spec: "Texture & color scanning" },
      { name: "Identica Blue", spec: "Articulator scanning" },
    ],
  },
  {
    category: "Sintering & Pressing",
    items: [
      { name: "Zirkonzahn Oven", spec: "Speed sintering technology" },
      { name: "Ivoclar EP 3010", spec: "Lithium disilicate pressing" },
      { name: "Dekema Austromat", spec: "Ceramic firing" },
    ],
  },
];

export function Equipment() {
  return (
    <section id="equipment" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-primary uppercase">
            Our Technology
          </span>
          <h2 className="mb-6 text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Industry-leading <span className="gold-text">equipment</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            We invest in the most advanced dental laboratory technology to
            ensure precision, consistency, and efficiency in every case.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {equipment.map((category) => (
            <div key={category.category} className="glass-card rounded-2xl p-8">
              <h3 className="mb-6 text-xl font-normal text-foreground">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start gap-4 rounded-xl border border-border/30 bg-secondary/30 p-4 transition-colors duration-300 hover:border-primary/30"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-normal text-foreground">
                        {item.name}
                      </div>
                      <div className="text-sm font-light text-muted-foreground">
                        {item.spec}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-2xl p-8 text-center">
          <p className="text-lg font-light text-muted-foreground">
            Our laboratory is fully digital, accepting{" "}
            <span className="text-foreground">STL, PLY, OBJ</span> files from
            all major intraoral scanners including{" "}
            <span className="gold-text">iTero, 3Shape TRIOS, Medit, Primescan</span>
            , and more.
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Award, Shield, Microscope, Clock } from "lucide-react";

const features = [
  {
    icon: Microscope,
    title: "Precision Engineering",
    description:
      "State-of-the-art CAD/CAM technology ensuring micron-level accuracy in every restoration.",
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    description:
      "Certified dental technicians with decades of combined experience in aesthetic dentistry.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Rigorous multi-stage quality control process guaranteeing flawless results every time.",
  },
  {
    icon: Clock,
    title: "Rapid Turnaround",
    description:
      "Efficient workflows delivering premium restorations within industry-leading timeframes.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <span className="mb-4 inline-block text-xs font-light tracking-widest text-primary uppercase">
              About Our Laboratory
            </span>
            <h2 className="mb-6 text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Where innovation meets{" "}
              <span className="gold-text">tradition</span>
            </h2>
            <p className="mb-8 text-lg font-light leading-relaxed text-muted-foreground">
              For over two decades, Precision Dental Lab has been at the
              forefront of dental restoration technology. We combine
              time-honored craftsmanship with cutting-edge digital workflows to
              deliver restorations that exceed expectations.
            </p>
            <p className="text-base font-light leading-relaxed text-muted-foreground">
              Our commitment to excellence has made us the trusted partner for
              leading dental practices across the region. Every case receives
              personalized attention from our team of master technicians.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-normal text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

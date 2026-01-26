"use client";

import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "FinanceFlow",
    category: "Fintech Platform",
    description: "A comprehensive banking dashboard with real-time analytics",
    gradient: "from-cyan-500/20 to-blue-600/20",
  },
  {
    title: "HealthSync",
    category: "Healthcare App",
    description: "Telemedicine platform connecting patients with doctors",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    title: "EcoTrack",
    category: "Sustainability",
    description: "Carbon footprint monitoring and reduction platform",
    gradient: "from-blue-500/20 to-indigo-600/20",
  },
  {
    title: "Metaverse Hub",
    category: "Web3 Platform",
    description: "Virtual reality social space with NFT integration",
    gradient: "from-cyan-600/20 to-teal-500/20",
  },
  {
    title: "SmartRetail",
    category: "E-commerce",
    description: "AI-powered inventory and sales management system",
    gradient: "from-sky-500/20 to-cyan-500/20",
  },
  {
    title: "DataVault",
    category: "Enterprise SaaS",
    description: "Secure data management and collaboration platform",
    gradient: "from-blue-600/20 to-sky-500/20",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative px-4 py-24">
      {/* Background effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Our Work
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our portfolio of successful projects that have helped businesses
            achieve their digital transformation goals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50"
            >
              {/* Gradient background */}
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <span className="neon-text text-4xl font-bold text-primary/60">
                  {project.title.charAt(0)}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-primary">
                  {project.category}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-primary">
                  <span className="font-medium">View Project</span>
                  <ExternalLink className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

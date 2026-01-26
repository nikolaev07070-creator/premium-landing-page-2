"use client";

const team = [
  {
    name: "Dr. Marcus Chen",
    role: "Laboratory Director",
    credentials: "CDT, MDT",
    bio: "25+ years in dental technology. Former president of the National Dental Technicians Association.",
    initials: "MC",
  },
  {
    name: "Elena Vasquez",
    role: "Head of Ceramics",
    credentials: "CDT",
    bio: "Specialized in high-aesthetic anterior restorations. Trained at the Zurich School of Dental Medicine.",
    initials: "EV",
  },
  {
    name: "James Park",
    role: "CAD/CAM Specialist",
    credentials: "CDT",
    bio: "Pioneer in digital dentistry workflows. Expert in implant planning and surgical guide design.",
    initials: "JP",
  },
  {
    name: "Sarah Mitchell",
    role: "Removables Lead",
    credentials: "CDT",
    bio: "Master craftsperson in full and partial dentures. Specializes in complex attachment cases.",
    initials: "SM",
  },
];

export function Team() {
  return (
    <section id="team" className="relative py-32 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-80 w-80 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-primary uppercase">
            Our Experts
          </span>
          <h2 className="mb-6 text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Meet the <span className="gold-text">masters</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            Our certified dental technicians bring decades of combined
            experience and a passion for perfection to every case.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="glass-card group rounded-2xl p-6 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/20">
                <span className="gold-text text-2xl font-light">
                  {member.initials}
                </span>
              </div>
              <h3 className="mb-1 text-lg font-normal text-foreground">
                {member.name}
              </h3>
              <div className="mb-1 text-sm font-light text-primary">
                {member.role}
              </div>
              <div className="mb-4 text-xs font-light tracking-wide text-muted-foreground">
                {member.credentials}
              </div>
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

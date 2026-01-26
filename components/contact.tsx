"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "2847 Innovation Drive, Suite 400",
    subvalue: "San Francisco, CA 94107",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(415) 555-0192",
    subvalue: "Toll-free: (800) 555-0192",
  },
  {
    icon: Mail,
    label: "Email",
    value: "cases@precisiondental.com",
    subvalue: "support@precisiondental.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 7:00 AM - 6:00 PM",
    subvalue: "Sat: 8:00 AM - 2:00 PM",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    practice: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-light tracking-widest text-primary uppercase">
            Get in Touch
          </span>
          <h2 className="mb-6 text-3xl font-light leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            Start your <span className="gold-text">partnership</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            Ready to experience the difference precision craftsmanship makes?
            Contact us to discuss your cases or schedule a lab tour.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="mb-6 text-xl font-normal text-foreground">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-light text-muted-foreground"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-light text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                    placeholder="doctor@practice.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="practice"
                  className="mb-2 block text-sm font-light text-muted-foreground"
                >
                  Practice Name
                </label>
                <Input
                  id="practice"
                  value={formData.practice}
                  onChange={(e) =>
                    setFormData({ ...formData, practice: e.target.value })
                  }
                  className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                  placeholder="Smith Family Dentistry"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-light text-muted-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="border-border/50 bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 resize-none"
                  placeholder="Tell us about your practice and how we can help..."
                />
              </div>
              <Button
                type="submit"
                className="glow-button w-full bg-primary py-6 text-base font-light text-primary-foreground hover:bg-primary/90"
              >
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="glass-card flex items-start gap-4 rounded-2xl p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="mb-1 text-xs font-light tracking-wide text-muted-foreground uppercase">
                    {info.label}
                  </div>
                  <div className="font-normal text-foreground">{info.value}</div>
                  <div className="text-sm font-light text-muted-foreground">
                    {info.subvalue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

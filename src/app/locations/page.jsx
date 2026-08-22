"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import LocationsHero from "@/components/Locationshero";
//import LocationMap from "@/components/LocationMap";
import LocationCard from "@/components/LocationCard";
import { locations } from "@/data/locations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocationsPage() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll("[data-card]") || [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />
      <LocationsHero count={locations.length} />

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-20">
        {/* Centered heading block */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-teal-500 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
            Find us
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-navy-900 mt-4">
            A team close to the ground
          </h2>
          <p className="text-ink-soft mt-3 leading-relaxed">
            Select a pin to see office details, or scroll through every location
            below.
          </p>
        </div>

        {/* Centered, evenly-gapped card grid */}
        <div ref={gridRef} className="mt-12 grid sm:grid-cols-2 gap-6 md:gap-7">
          {locations.map((loc) => (
            <div key={loc.id} data-card className="rounded-[1.75rem]">
              <LocationCard
                location={loc}
                active={activeId === loc.id}
                onHover={setActiveId}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              Don&rsquo;t see a location near you?
            </h2>
            <p className="text-white/70 mt-2 max-w-lg">
              We work with sites nationwide, remote and in-person. Reach out and
              we&rsquo;ll route you to the right regional team.
            </p>
          </div>
          <a
            href="/contact"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-600 transition-colors px-7 py-3 font-semibold text-navy-950 shrink-0"
          >
            Contact us
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

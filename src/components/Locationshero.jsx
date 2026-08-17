"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LocationsHero({ count }) {
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll(".word") || [];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
      )
        .fromTo(
          words,
          { opacity: 0, y: "110%" },
          { opacity: 1, y: "0%", duration: 0.75, stagger: 0.06 },
          "-=0.2",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35",
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        );
    });
    return () => ctx.revert();
  }, []);

  const headline = "Where we show up for trials";

  return (
    <section className="relative overflow-hidden bg-[#0A1730] text-white">
      {/* background photo — swap src for your own image */}
      <img
        src="/assets/loaction.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* flat blue overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#2547d0]/90" />

      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#F5B301]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-[#2DD4BF]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-16 md:pt-20 md:pb-20">
        <span
          ref={badgeRef}
          className="inline-block rounded-full bg-[#F5B301] text-[#0A1730] text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
        >
          Locations
        </span>

        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] max-w-3xl mt-6"
        >
          {headline.split(" ").map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom mr-3"
            >
              <span className="word inline-block">{w}</span>
            </span>
          ))}
        </h1>

        <p ref={subRef} className="mt-5 max-w-xl text-white/70 leading-relaxed">
          From Kolkata to Hyderabad, our teams sit close to the sites we manage
          &mdash; because clinical trial coordination works better in person.
        </p>

        <div
          ref={statsRef}
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl"
        >
          {[
            { value: count, label: "Locations" },
            { value: "120+", label: "Partner sites" },
            { value: "3", label: "States" },
            { value: "210", label: "Team members" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl md:text-3xl text-white">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wide text-white/50 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

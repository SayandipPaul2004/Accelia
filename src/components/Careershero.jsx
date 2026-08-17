"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Expertise", href: "/expertise" },
  { label: "Company", href: "/company", hasDropdown: true },
];

export default function CareersHero({ onExplore }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      aria-label="Careers hero"
      className="relative overflow-hidden bg-navy-950 text-white"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/careers-hero.jpg"
          alt=""
          role="presentation"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-950/85 to-navy-900/70" />
      </div>

      {/* Subtle grid texture, matches your existing hero */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ---------- Nav ---------- */}
      <nav
        aria-label="Primary"
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between"
      >
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/images/accelia-logo-white.svg"
            alt="Accelia"
            className="h-7 w-auto"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="focus-ring inline-flex items-center gap-1 text-white/85 hover:text-white transition-colors"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="/contact"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white text-navy-950 pl-5 pr-1.5 py-1.5 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Let's Connect
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-white">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="focus-ring md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
        >
          {menuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative z-20 md:hidden overflow-hidden border-t border-white/10 bg-navy-950/95 backdrop-blur"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="focus-ring flex items-center justify-between py-3 text-base font-medium text-white/85 hover:text-white"
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/contact"
                  className="focus-ring flex items-center justify-center gap-2 rounded-full bg-white text-navy-950 py-3 text-sm font-semibold"
                >
                  Let's Connect
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Hero content ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-32">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block rounded-full bg-gold-500 text-navy-950 text-xs font-semibold uppercase tracking-wider px-4 py-1.5"
        >
          Careers
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] max-w-2xl mt-6"
        >
          Join Accelia Clinical Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed"
        >
          Search open requisitions across clinical operations, data management,
          regulatory, and engineering — and help us bring the right treatments
          to the right patients, faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <button
            type="button"
            onClick={onExplore}
            className="focus-ring rounded-full bg-teal-500 hover:bg-teal-600 transition-colors px-7 py-3 font-semibold text-white text-center"
          >
            Browse open roles
          </button>
          <a
            href="#life-at-accelia"
            className="focus-ring rounded-full border border-white/25 hover:border-white/50 transition-colors px-7 py-3 font-semibold text-white text-center"
          >
            Life at Accelia
          </a>
        </motion.div>

        {/* Quick stats row — collapses to 2-col grid on mobile */}
        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl border-t border-white/10 pt-8"
        >
          {[
            { value: "40+", label: "Open roles" },
            { value: "15", label: "Countries" },
            { value: "500+", label: "Team members" },
            { value: "GCP", label: "Trained staff" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl sm:text-3xl">
                {stat.value}
              </dd>
              <dd className="text-xs sm:text-sm text-white/60 mt-1">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

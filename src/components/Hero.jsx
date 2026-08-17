"use client";

import { motion } from "framer-motion";

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24">
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
          className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] max-w-2xl mt-6"
        >
          Join Accelia Clinical Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-xl text-white/70 leading-relaxed"
        >
          Search open requisitions across clinical operations, data management,
          regulatory, and engineering.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          onClick={onExplore}
          className="focus-ring mt-8 rounded-full bg-teal-500 hover:bg-teal-600 transition-colors px-7 py-3 font-semibold text-white"
        >
          Browse open roles
        </motion.button>
      </div>
    </section>
  );
}

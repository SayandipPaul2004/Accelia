"use client";

import { motion } from "framer-motion";

/**
 * Reusable page hero — matches the "Specialized Therapeutic Solutions"
 * reference design exactly: same logo mark, same nav row, same headline
 * weight/size, same paragraph treatment. Swap the background image and
 * copy per page via props.
 *
 * Usage:
 * <PageHero
 *   image="/images/careers-hero.jpg"
 *   eyebrow="Careers"              // optional pill above headline
 *   title="Join Accelia Clinical Solutions"
 *   description="Search open requisitions across clinical operations..."
 * >
 *   // optional children rendered below the description (buttons, stats, etc.)
 * </PageHero>
 *
 * NOTE: all props below have sensible defaults, so if you forget to pass
 * title/description/image on a page, the hero still renders with fallback
 * copy instead of showing up blank (which is what was happening before).
 */

export default function PageHero({
  image = "/assets/carrer.avif",
  title = "Join Accelia Clinical Solutions",
  description = "Search open requisitions across clinical operations, data management, regulatory, and engineering — and help us bring the right treatments to the right patients, faster.",
  children,
}) {
  return (
    <section className="relative min-h-[480px] sm:min-h-[560px] flex items-end overflow-hidden">
      {/* Background image + blue overlay — same treatment on every page */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          role="presentation"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#2547d0]/60" />
      </div>

      {/* ---------- Hero content — exact font sizes from the reference ---------- */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 pb-16 sm:pb-40 md:pb-42">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.08] max-w-4xl text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed"
        >
          {description}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

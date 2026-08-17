"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "For Sites",
    links: [
      { label: "Why Join", href: "/sites/why-join" },
      { label: "FAQs", href: "/sites/faqs" },
    ],
  },
  {
    title: "For Sponsors & CROs",
    links: [
      { label: "Why Use Accelia", href: "/sponsors/why-accelia" },
      { label: "Submit a Request", href: "/sponsors/submit-request" },
      { label: "Capabilities & Metrics", href: "/sponsors/capabilities" },
      { label: "FAQs", href: "/sponsors/faqs" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#232C6E] via-[#2C3A8C] to-[#3A4AA8] overflow-hidden">
      {/* organic blob shapes */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] -z-0 opacity-90">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <path
            d="M300,60 C370,110 380,220 320,290 C260,360 140,370 80,300 C20,230 30,120 100,70 C170,20 250,10 300,60 Z"
            fill="#4FD8EA"
            opacity="0.18"
          />
        </svg>
      </div>
      <div className="absolute right-[-60px] top-[120px] w-[420px] h-[420px] -z-0">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <path
            d="M300,70 C360,130 370,230 310,300 C250,370 130,370 70,300 C10,230 20,120 90,70 C160,20 240,10 300,70 Z"
            fill="#0E9FBE"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        {/* main columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {columns.map((col, ci) => (
            <motion.div
              key={col.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={ci}
              variants={fadeUp}
            >
              <h3 className="text-white text-lg font-semibold mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-teal-300 text-[15px] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* contact column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={3}
            variants={fadeUp}
          >
            <h3 className="text-white text-lg font-semibold mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-teal-300 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="acceliaclinicalsolution@gmail.com"
                  className="text-white/80 hover:text-teal-300 text-[15px] transition-colors"
                >
                  acceliaclinicalsolution@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-teal-300 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white/80 text-[15px] leading-relaxed">
                  Kolkata
                  <br />
                  West Bengal
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-teal-300 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="+91 8282986162"
                  className="text-white/80 hover:text-teal-300 text-[15px] transition-colors"
                >
                  +91 8282986162
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* divider */}
        <div className="h-px bg-white/15 my-12" />

        {/* bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/logo2.png"
              alt="Accelia"
              width={180}
              height={45}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            <Link
              href="/privacy"
              className="hover:text-teal-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-teal-300 transition-colors"
            >
              Terms of Use
            </Link>
            <a
              href="tel:+18885958884"
              className="hover:text-teal-300 transition-colors"
            >
              Call Us : +91 8282986162
            </a>
            <Link
              href="/blog"
              className="hover:text-teal-300 transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* social + CTA */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
              </svg>
            </a>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white text-slate-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:shadow-lg hover:shadow-white/10 transition-shadow"
              >
                Let&apos;s Connect
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

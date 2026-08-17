"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Expertise", href: "/expertise" },
  {
    label: "Company",
    href: "/about",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "News & Events", href: "/news" },
      { label: "Locations", href: "/locations" },
    ],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const topBarRef = useRef(null);
  const midBarRef = useRef(null);
  const botBarRef = useRef(null);
  const linkRefs = useRef([]);

  /* ---------- scroll-aware chrome ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- gsap hamburger morph ---------- */
  useEffect(() => {
    const top = topBarRef.current;
    const mid = midBarRef.current;
    const bot = botBarRef.current;
    if (!top || !mid || !bot) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(mid, { opacity: 0, x: -8, duration: 0.18 }, 0)
      .to(top, { y: 0, rotate: 45, duration: 0.28, ease: "power3.inOut" }, 0.05)
      .to(
        bot,
        { y: 0, rotate: -45, duration: 0.28, ease: "power3.inOut" },
        0.05,
      );

    if (mobileOpen) tl.play();
    else tl.reverse();
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(8,10,14,0.92)" : "rgba(8,10,14,0)",
          borderBottomColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="relative flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/logo.png"
                  alt="Accelia"
                  width={400}
                  height={400}
                  priority
                  className="h-14 sm:h-20 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {/* Desktop nav with shared sliding indicator */}
              <div
                className="flex items-center gap-2 relative"
                onMouseLeave={() => setHoverIndex(null)}
              >
                {navLinks.map((link, i) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => {
                      setHoverIndex(i);
                      link.dropdown && setOpenDropdown(link.label);
                    }}
                    onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
                  >
                    {hoverIndex === i && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-[#2436C4]/15 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <Link
                      href={link.href}
                      className="relative z-10 flex items-center gap-1.5 text-white/95 hover:text-white font-semibold text-lg lg:text-xl transition-colors px-4 py-2.5 rounded-full"
                    >
                      {link.label}
                      {link.dropdown && (
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          animate={{
                            rotate: openDropdown === link.label ? 180 : 0,
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </motion.svg>
                      )}
                    </Link>

                    <AnimatePresence>
                      {link.dropdown && openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-3 w-60 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl overflow-hidden py-2"
                        >
                          {link.dropdown.map((item, di) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: di * 0.045, duration: 0.15 }}
                            >
                              <Link
                                href={item.href}
                                className="group flex items-center gap-2 px-5 py-2.5 text-slate-700 hover:bg-teal-50 hover:text-teal-600 text-sm transition-colors duration-200"
                              >
                                <span className="h-1 w-1 rounded-full bg-teal-400 scale-0 group-hover:scale-100 transition-transform duration-200" />
                                {item.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Desktop CTA */}
              <Link
                href="/contact"
                className="flex items-center gap-3 bg-white text-slate-950 font-semibold text-lg pl-6 pr-2 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                Let&apos;s Connect
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Mobile hamburger — gsap morph to X */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white z-[60]"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                ref={topBarRef}
                className="absolute w-5 h-[2px] bg-white rounded-full"
                style={{ transform: "translateY(-6px)" }}
              />
              <span
                ref={midBarRef}
                className="absolute w-5 h-[2px] bg-white rounded-full"
              />
              <span
                ref={botBarRef}
                className="absolute w-5 h-[2px] bg-white rounded-full"
                style={{ transform: "translateY(6px)" }}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-50 bg-slate-950/90"
            onClick={closeAll}
          >
            <motion.div
              initial={{ clipPath: "circle(0% at 92% 5%)" }}
              animate={{ clipPath: "circle(150% at 92% 5%)" }}
              exit={{ clipPath: "circle(0% at 92% 5%)" }}
              transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full px-6 pt-28 pb-10 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 18 }}
                      transition={{
                        delay: 0.15 + i * 0.06,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      <div className="flex items-center justify-between border-b border-white/10">
                        <Link
                          href={link.href}
                          onClick={() => !link.dropdown && closeAll()}
                          className="text-white text-3xl font-semibold py-4 flex-1 tracking-tight active:text-teal-300 transition-colors"
                        >
                          {link.label}
                        </Link>
                        {link.dropdown && (
                          <button
                            onClick={() =>
                              setMobileExpanded(
                                mobileExpanded === link.label
                                  ? null
                                  : link.label,
                              )
                            }
                            className="text-white/60 p-3"
                            aria-label={`Toggle ${link.label} submenu`}
                          >
                            <motion.svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              animate={{
                                rotate: mobileExpanded === link.label ? 180 : 0,
                              }}
                              transition={{ duration: 0.25 }}
                            >
                              <path d="M6 9l6 6 6-6" />
                            </motion.svg>
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {link.dropdown && mobileExpanded === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex flex-col gap-1 overflow-hidden pl-1"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={closeAll}
                                className="text-white/60 hover:text-teal-300 text-base py-2.5 transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{
                    delay: 0.15 + navLinks.length * 0.06,
                    duration: 0.35,
                  }}
                  className="mt-auto pt-8"
                >
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-3 bg-white text-slate-950 font-semibold px-6 py-3 pr-3 rounded-full text-lg active:scale-95 transition-transform"
                  >
                    Let&apos;s Connect
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 text-white">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

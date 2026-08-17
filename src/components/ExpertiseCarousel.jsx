// components/ExpertiseCarousel.jsx
"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import ExpertiseCard from "@/components/ExpertiseCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExpertiseCarousel({ expertiseAreas = [], error }) {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0 });

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 0;
    setProgress(pct);
    setActiveIndex(Math.round(pct * (expertiseAreas.length - 1)));
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, [expertiseAreas.length]);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // GSAP scroll-triggered entrance for the carousel section + cards
  useEffect(() => {
    if (expertiseAreas.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 97%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.from(sectionRef.current.querySelectorAll(".expertise-card-wrap"), {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [expertiseAreas.length]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[i];
    if (card) el.scrollTo({ left: card.offsetLeft - 24, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
    };
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };
  const onPointerMove = (e) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScroll - dx;
  };
  const endDrag = () => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current.dragging = false;
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  };

  return (
    <main className="bg-white">
      {/* hero */}
      <section className="relative bg-gradient-to-br from-[#0A1730] to-[#101F38] overflow-hidden">
        <Navbar />
        <div className="relative max-w-5xl px-6 md:px-10 pt-40 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-teal-300 text-xs font-mono tracking-[0.2em] uppercase mb-5"
          ></motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.05]"
          >
            Our Areas of Expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-white/70 leading-relaxed max-w-2xl"
          >
            Precision-driven execution across all critical specialty and
            therapeutic areas — backed by deep clinical knowledge and
            GCP-trained teams, ready to deliver results across diverse patient
            populations.
          </motion.p>
        </div>
      </section>

      {/* carousel */}
      <section ref={sectionRef} className="relative py-20">
        {error && (
          <p className="text-center text-red-500 text-sm mb-6 px-6">
            Couldn&apos;t load expertise areas right now. Please refresh.
          </p>
        )}

        {!error && expertiseAreas.length === 0 && (
          <p className="text-center text-slate-500 text-sm mb-6 px-6">
            No expertise areas added yet.
          </p>
        )}

        {expertiseAreas.length > 0 && (
          <>
            <div
              ref={scrollRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-6 md:px-10 scrollbar-hide cursor-grab select-none"
            >
              {expertiseAreas.map((area, i) => (
                <div key={area._id} className="expertise-card-wrap">
                  <ExpertiseCard
                    title={area.title}
                    description={area.desc}
                    icon={area.icon}
                    index={i}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-6 mt-6 max-w-7xl mx-auto px-6 md:px-10">
              <div className="flex items-center gap-2">
                {expertiseAreas.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to ${expertiseAreas[i].title}`}
                    className="p-1.5"
                  >
                    <motion.span
                      animate={{
                        width: activeIndex === i ? 20 : 6,
                        backgroundColor:
                          activeIndex === i ? "#0A1730" : "#CBD5E1",
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="block h-1.5 rounded-full"
                    />
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scroll("left")}
                  disabled={atStart}
                  className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Scroll left"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={atEnd}
                  className="w-11 h-11 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Scroll right"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-3">
              <div className="h-[2px] bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-teal-400 rounded-full"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

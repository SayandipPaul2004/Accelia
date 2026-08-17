"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function ContactSuccessPage() {
  const checkRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!checkRef.current || !circleRef.current) return;

    const circleLength = circleRef.current.getTotalLength();
    const checkLength = checkRef.current.getTotalLength();

    gsap.set(circleRef.current, {
      strokeDasharray: circleLength,
      strokeDashoffset: circleLength,
    });
    gsap.set(checkRef.current, {
      strokeDasharray: checkLength,
      strokeDashoffset: checkLength,
    });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(circleRef.current, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.out",
    }).to(
      checkRef.current,
      { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" },
      "-=0.15",
    );
  }, []);

  return (
    <main className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center px-4 py-24">
      {/* ambient decorative blobs */}
      <motion.svg
        aria-hidden
        className="hidden sm:block absolute -right-16 -top-16 w-72 h-72 opacity-70"
        viewBox="0 0 200 200"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="successBlob1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C93F5" />
            <stop offset="100%" stopColor="#5EEAD4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#successBlob1)"
          d="M45,-58C58,-49,68,-34,71,-18C74,-2,70,16,60,30C50,44,34,54,16,61C-2,68,-24,72,-40,63C-56,54,-66,32,-68,10C-70,-12,-64,-33,-50,-46C-36,-59,-14,-64,4,-68C22,-72,32,-67,45,-58Z"
          transform="translate(100 100)"
        />
      </motion.svg>
      <motion.svg
        aria-hidden
        className="hidden sm:block absolute -left-20 bottom-0 w-64 h-64 opacity-60"
        viewBox="0 0 200 200"
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      >
        <defs>
          <linearGradient id="successBlob2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2436C4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <path
          fill="url(#successBlob2)"
          d="M40,-52C52,-44,61,-30,64,-15C67,0,64,17,55,30C46,43,31,52,14,58C-3,64,-22,66,-37,58C-52,50,-63,32,-66,13C-69,-6,-64,-27,-51,-40C-38,-53,-17,-58,1,-59C19,-60,28,-60,40,-52Z"
          transform="translate(100 100)"
        />
      </motion.svg>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 bg-white px-8 sm:px-12 py-12 sm:py-14 text-center"
      >
        {/* animated check */}
        <div className="mx-auto w-24 h-24 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              ref={circleRef}
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#2436C4"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              ref={checkRef}
              d="M30 52 L44 66 L72 36"
              fill="none"
              stroke="#2436C4"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-[#0B1650]"
        >
          Message Sent Successfully
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.62 }}
          className="text-slate-500 leading-relaxed mt-4"
        >
          Thanks for reaching out. Our partnerships team will review your
          details and get back to you within one to two business days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.74 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Link href="/" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-[#2436C4] hover:bg-[#1c2ba3] text-white font-semibold px-7 py-3 rounded-full transition-colors"
            >
              Back to Home
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
            </motion.span>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 border border-slate-200 text-[#0B1650] font-semibold px-7 py-3 rounded-full hover:border-[#2436C4]/40 hover:bg-slate-50 transition-colors"
            >
              Send Another Message
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}

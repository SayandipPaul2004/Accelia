"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Typewriter({
  phrases = ["TRUSTED PARTNERSHIP", "THERAPEUTIC EXPERTISE"],
  displayTime = 2400,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, displayTime);
    return () => clearInterval(interval);
  }, [phrases.length, displayTime]);

  const currentPhrase = phrases[index];
  const letters = currentPhrase.split("");

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035 } },
    exit: { transition: { staggerChildren: 0.012, staggerDirection: -1 } },
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentPhrase}
          variants={container}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block"
        >
          {letters.map((char, i) => (
            <motion.span key={i} variants={letter} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

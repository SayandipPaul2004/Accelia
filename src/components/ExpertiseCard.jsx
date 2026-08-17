// components/ExpertiseCard.jsx
"use client";
import { motion } from "framer-motion";

export default function ExpertiseCard({ icon, title, description, index }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.06 }}
      className="group relative shrink-0 w-[80vw] sm:w-[340px] h-[440px] rounded-2xl overflow-hidden snap-start shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/25 transition-shadow duration-500"
    >
      {/* background — always the gradient fallback since backend has no image field */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1730] via-[#0F2547] to-[#0A1730]" />

      {/* card index */}
      <span className="absolute top-6 right-6 text-white/40 text-xs font-mono tracking-widest">
        {num}
      </span>

      {/* icon badge — renders the emoji directly */}
      <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl">
        {icon}
      </div>

      {/* text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-[22px] leading-tight font-semibold text-white mb-2">
          {title}
        </h3>
        <p
          className="text-white/75 text-sm leading-relaxed"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

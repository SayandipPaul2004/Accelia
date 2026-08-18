"use client";
import { motion } from "framer-motion";

export default function ExpertiseCard({
  icon,
  title,
  description,
  image,
  index,
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.04 }}
      className="group relative shrink-0 w-[78vw] sm:w-[340px] h-[400px] sm:h-[440px] rounded-2xl overflow-hidden snap-start shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/25 transition-shadow duration-500"
    >
      {/* image section */}
      <div className="absolute inset-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2547d0] via-[#3a5ce0] to-[#16307a]" />
        )}
      </div>

      {/* overlay so text stays readable over the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16307a] via-[#16307a]/45 to-transparent" />

      {/* card index */}
      <span className="absolute top-5 right-5 text-white/50 text-xs font-mono tracking-widest">
        {num}
      </span>

      {/* icon badge */}
      <div className="absolute top-5 left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl sm:text-2xl">
        {icon}
      </div>

      {/* text content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h3 className="text-lg sm:text-[22px] leading-tight font-semibold text-white mb-2">
          {title}
        </h3>
        <p
          className="text-white/80 text-sm leading-relaxed"
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

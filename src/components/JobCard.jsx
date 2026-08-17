"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { formatPostedDate } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function JobCard({ job, index, onOpen }) {
  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl2 border border-line bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
      onClick={() => onOpen(job)}
    >
      {job.featured && (
        <span className="absolute -top-2.5 left-6 rounded-full bg-gold-500 text-navy-950 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1">
          Featured
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-wide text-teal-600">
            {job.id}
          </p>
          <h3 className="font-display text-lg font-semibold text-ink mt-1.5 leading-snug">
            {job.title}
          </h3>
        </div>
        <ArrowUpRight className="w-5 h-5 text-ink-faint shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-500" />
      </div>

      <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-2">
        {job.summary}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-ink-faint" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-ink-faint" />
          {job.type}
        </span>
        <span className="rounded-md bg-slate-50 border border-line text-ink-soft px-2.5 py-1 font-medium">
          {job.department}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs">
        <span className="text-ink-faint">
          Posted {formatPostedDate(job.posted)}
        </span>
        <span className="font-semibold text-navy-900 group-hover:text-teal-600 transition-colors">
          View role &rarr;
        </span>
      </div>
    </motion.article>
  );
}

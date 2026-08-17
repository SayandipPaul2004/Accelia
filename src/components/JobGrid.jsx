"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import JobCard from "./JobCard";

export default function JobGrid({ jobs, onOpen }) {
  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center py-24"
      >
        <SearchX className="w-8 h-8 text-ink-faint mb-4" />
        <p className="font-display text-lg text-ink font-semibold">
          No roles match those filters
        </p>
        <p className="text-sm text-ink-soft mt-1.5 max-w-sm">
          Try widening your search, or clear filters to see every open
          requisition.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence mode="popLayout">
        {jobs.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} onOpen={onOpen} />
        ))}
      </AnimatePresence>
    </div>
  );
}

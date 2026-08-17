"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { departments, locations, jobTypes } from "@/data/jobs";

export default function FilterBar({
  search,
  setSearch,
  department,
  setDepartment,
  location,
  setLocation,
  jobType,
  setJobType,
  resultCount,
  onClear,
}) {
  const hasActiveFilters =
    search ||
    department !== "All Departments" ||
    location !== "All Locations" ||
    jobType !== "All Types";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 bg-paper/90 backdrop-blur-md border-b border-line"
      id="explore"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* search box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles, keywords, req ID..."
              className="focus-ring w-full rounded-full border border-line bg-white pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-faint transition-shadow focus:shadow-card"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect
              value={department}
              onChange={setDepartment}
              options={departments}
              icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
            />
            <FilterSelect
              value={location}
              onChange={setLocation}
              options={locations}
            />
            <FilterSelect
              value={jobType}
              onChange={setJobType}
              options={jobTypes}
            />

            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="focus-ring flex items-center gap-1 text-sm text-ink-soft hover:text-coral-500 transition-colors px-2"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 text-xs font-mono text-ink-faint uppercase tracking-wide">
          {resultCount} {resultCount === 1 ? "role" : "roles"} match your
          filters
        </p>
      </div>
    </motion.div>
  );
}

function FilterSelect({ value, onChange, options, icon }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring appearance-none rounded-full border border-line bg-white pl-4 pr-9 py-3 text-sm text-ink cursor-pointer hover:border-teal-500/50 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-ink-faint"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

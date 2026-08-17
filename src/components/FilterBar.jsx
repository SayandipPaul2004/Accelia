"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilters = [
    department !== "All Departments",
    location !== "All Locations",
    jobType !== "All Types",
  ].filter(Boolean).length;

  const hasActiveFilters = Boolean(search) || activeFilters > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200"
      id="explore"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* search box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles, keywords, req ID..."
              className="w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 outline-none transition-shadow focus:shadow-md focus:border-[#2547d0]/50 focus:ring-2 focus:ring-[#2547d0]/20"
            />
          </div>

          {/* desktop filters — inline row from lg up */}
          <div className="hidden lg:flex flex-wrap items-center gap-3">
            <FilterSelect
              value={department}
              onChange={setDepartment}
              options={departments}
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

            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  onClick={onClear}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#2547d0] transition-colors px-2 outline-none"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* mobile filters toggle — below lg */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="relative flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 active:scale-[0.98] transition-transform outline-none"
              aria-expanded={mobileFiltersOpen}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#2547d0]" />
              Filters
              {activeFilters > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#2547d0] text-white text-[11px] font-bold">
                  {activeFilters}
                </span>
              )}
              <motion.span
                animate={{ rotate: mobileFiltersOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="ml-1"
              >
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </motion.span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={onClear}
                aria-label="Clear filters"
                className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full border border-slate-200 bg-white text-slate-500 active:scale-[0.95] active:text-[#2547d0] transition-transform outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* mobile collapsible filter panel */}
        <div className="lg:hidden">
          <AnimatePresence initial={false}>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2.5 pt-3">
                  {[
                    {
                      value: department,
                      onChange: setDepartment,
                      options: departments,
                    },
                    {
                      value: location,
                      onChange: setLocation,
                      options: locations,
                    },
                    { value: jobType, onChange: setJobType, options: jobTypes },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      <FilterSelect
                        value={f.value}
                        onChange={f.onChange}
                        options={f.options}
                        fullWidth
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-3 text-xs font-mono text-slate-400 uppercase tracking-wide">
          {resultCount} {resultCount === 1 ? "role" : "roles"} match your
          filters
        </p>
      </div>
    </motion.div>
  );
}

function FilterSelect({ value, onChange, options, fullWidth = false }) {
  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-full border border-slate-200 bg-white pl-4 pr-9 py-3 text-sm text-slate-950 cursor-pointer outline-none hover:border-[#2547d0]/50 focus:border-[#2547d0]/50 focus:ring-2 focus:ring-[#2547d0]/20 transition-colors ${
          fullWidth ? "w-full" : ""
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
    </div>
  );
}

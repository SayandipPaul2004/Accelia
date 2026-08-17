"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import FilterBar from "@/components/FilterBar";
import JobGrid from "@/components/JobGrid";
import JobModal from "@/components/JobModal";
import { jobs as allJobs } from "@/data/jobs";

export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [activeJob, setActiveJob] = useState(null);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allJobs.filter((job) => {
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q);
      const matchesDept =
        department === "All Departments" || job.department === department;
      const matchesLoc =
        location === "All Locations" || job.location === location;
      const matchesType = jobType === "All Types" || job.type === jobType;
      return matchesSearch && matchesDept && matchesLoc && matchesType;
    });
  }, [search, department, location, jobType]);

  function clearFilters() {
    setSearch("");
    setDepartment("All Departments");
    setLocation("All Locations");
    setJobType("All Types");
  }

  function scrollToExplore() {
    document
      .getElementById("explore")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-paper">
      <Hero onExplore={scrollToExplore} />

      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-2">
        <span className="inline-block rounded-full bg-teal-500 text-white text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
          Open positions
        </span>
        <h2 className="font-display text-3xl md:text-4xl text-navy-900 mt-4">
          Current Openings
        </h2>
      </section>

      <FilterBar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        resultCount={filteredJobs.length}
        onClear={clearFilters}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <JobGrid jobs={filteredJobs} onOpen={setActiveJob} />
      </section>

      <JobModal job={activeJob} onClose={() => setActiveJob(null)} />
    </main>
  );
}

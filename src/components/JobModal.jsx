"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  X,
  MapPin,
  Clock,
  BriefcaseBusiness,
  ShieldCheck,
  GraduationCap,
  Globe,
  HeartHandshake,
} from "lucide-react";
import { formatPostedDate } from "@/lib/utils";

const defaultPerks = [
  { icon: ShieldCheck, label: "Health & wellness coverage" },
  { icon: GraduationCap, label: "Learning & certification budget" },
  { icon: Globe, label: "Flexible / remote-friendly setup" },
  { icon: HeartHandshake, label: "Collaborative, mission-led team" },
];

export default function JobModal({ job, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = job ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {job && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0A1730]/60 backdrop-blur-sm z-[70] cursor-pointer"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="pointer-events-auto w-full sm:max-w-xl h-[92vh] sm:h-[85vh] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* mobile drag handle */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                <span className="w-10 h-1.5 rounded-full bg-slate-200" />
              </div>

              <div className="flex items-center justify-between px-6 md:px-8 py-4 sm:py-5 border-b border-slate-200 shrink-0">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wide">
                  Role details
                </span>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-950 transition-colors outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/*
                data-lenis-prevent excludes this element from Lenis's global
                wheel-event hijacking so desktop scroll works inside the modal.
              */}
              <div
                data-lenis-prevent
                className="overflow-y-auto overscroll-contain flex-1 min-h-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <JDView job={job} />
              </div>

              {/* sticky footer — now links to the dedicated apply page instead
                  of switching an internal modal view */}
              <div
                className="shrink-0 border-t border-slate-200 bg-white px-6 md:px-8 py-4"
                style={{
                  paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
                }}
              >
                <Link
                  href={`/careers/apply/${job.id}`}
                  className="block w-full text-center rounded-full bg-[#2547d0] hover:bg-[#1d3aa8] active:scale-[0.99] transition-all px-8 py-3.5 font-semibold text-white outline-none cursor-pointer"
                >
                  Apply for this role
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function JDView({ job }) {
  const perks = job.perks?.length ? job.perks : defaultPerks;

  return (
    <div className="px-6 md:px-8 py-6 pb-10">
      {job.featured && (
        <span className="inline-block rounded-full bg-[#2547d0] text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 mb-3">
          Featured role
        </span>
      )}
      <p className="font-mono text-xs text-[#2547d0]">{job.id}</p>
      <h2 className="font-display text-2xl font-semibold text-slate-950 mt-1.5 leading-snug">
        {job.title}
      </h2>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-slate-400" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="w-4 h-4 text-slate-400" />
          {job.experience}
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        {job.department} &middot; Posted {formatPostedDate(job.posted)}
      </p>

      <Section title="About the role">
        <p className="text-sm text-slate-600 leading-relaxed">{job.summary}</p>
      </Section>

      <Section title="What you'll do">
        <ul className="space-y-2.5">
          {job.responsibilities.map((r) => (
            <ListItem key={r}>{r}</ListItem>
          ))}
        </ul>
      </Section>

      <Section title="What you'll bring">
        <ul className="space-y-2.5">
          {job.requirements.map((r) => (
            <ListItem key={r}>{r}</ListItem>
          ))}
        </ul>
      </Section>

      {job.niceToHave?.length > 0 && (
        <Section title="Nice to have">
          <ul className="space-y-2.5">
            {job.niceToHave.map((r) => (
              <ListItem key={r}>{r}</ListItem>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Why join Accelia">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3"
              >
                {Icon && (
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2547d0]/10 text-[#2547d0] shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <span className="text-sm text-slate-600 leading-snug">
                  {p.label}
                </span>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-7">
      <h3 className="font-display text-sm font-semibold text-slate-950 uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2547d0] shrink-0" />
      <span>{children}</span>
    </li>
  );
}

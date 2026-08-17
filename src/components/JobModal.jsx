"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Clock, BriefcaseBusiness } from "lucide-react";
import ApplyForm, { SuccessScreen } from "./ApplyForm";
import { formatPostedDate } from "@/lib/utils";

export default function JobModal({ job, onClose }) {
  const [view, setView] = useState("jd"); // 'jd' | 'apply' | 'success'
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    if (job) setView("jd");
    document.body.style.overflow = job ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  return (
    <AnimatePresence>
      {job && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] bg-paper z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-line shrink-0">
              <span className="font-mono text-xs text-ink-faint uppercase tracking-wide">
                {view === "apply"
                  ? "Application"
                  : view === "success"
                    ? "Submitted"
                    : "Role details"}
              </span>
              <button
                onClick={onClose}
                className="focus-ring text-ink-faint hover:text-ink transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto thin-scroll flex-1">
              <AnimatePresence mode="wait">
                {view === "jd" && (
                  <motion.div
                    key="jd"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <JDView job={job} onApply={() => setView("apply")} />
                  </motion.div>
                )}

                {view === "apply" && (
                  <motion.div
                    key="apply"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ApplyForm
                      job={job}
                      onBack={() => setView("jd")}
                      onSubmitted={(data) => {
                        setApplicant(data);
                        setView("success");
                      }}
                    />
                  </motion.div>
                )}

                {view === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <SuccessScreen
                      job={job}
                      applicant={applicant}
                      onClose={onClose}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function JDView({ job, onApply }) {
  return (
    <div className="px-6 md:px-8 py-6">
      {job.featured && (
        <span className="inline-block rounded-full bg-gold-500 text-navy-950 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 mb-3">
          Featured role
        </span>
      )}
      <p className="font-mono text-xs text-teal-600">{job.id}</p>
      <h2 className="font-display text-2xl font-semibold text-ink mt-1.5 leading-snug">
        {job.title}
      </h2>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-ink-faint" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-ink-faint" />
          {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness className="w-4 h-4 text-ink-faint" />
          {job.experience}
        </span>
      </div>
      <p className="text-xs text-ink-faint mt-3">
        {job.department} &middot; Posted {formatPostedDate(job.posted)}
      </p>

      <button
        onClick={onApply}
        className="focus-ring mt-6 w-full sm:w-auto rounded-full bg-teal-500 hover:bg-teal-600 transition-colors px-8 py-3 font-semibold text-white"
      >
        Apply for this role
      </button>

      <Section title="About the role">
        <p className="text-sm text-ink-soft leading-relaxed">{job.summary}</p>
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

      <div className="mt-8 pt-6 border-t border-line">
        <button
          onClick={onApply}
          className="focus-ring w-full rounded-full bg-navy-950 hover:bg-navy-900 transition-colors text-white font-semibold py-3.5"
        >
          Apply for this role
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-7">
      <h3 className="font-display text-sm font-semibold text-ink uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex gap-2.5 text-sm text-ink-soft leading-relaxed">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

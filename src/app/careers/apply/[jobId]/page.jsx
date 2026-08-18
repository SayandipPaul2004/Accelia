"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, BriefcaseBusiness } from "lucide-react";
import ApplyForm, { SuccessScreen } from "@/components/ApplyForm";
import { jobs } from "@/data/jobs";

export default function ApplyPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const job = jobs.find((j) => j.id === jobId);

  const [view, setView] = useState("form"); // 'form' | 'success'
  const [applicant, setApplicant] = useState(null);

  if (!job) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-xl font-semibold text-slate-950">
          Role not found
        </p>
        <p className="text-sm text-slate-600 mt-2 max-w-sm">
          This posting may have closed, or the link is incorrect.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header strip — job context, no longer squeezed into a modal */}
      <div className="bg-[#2547d0] text-white px-5 sm:px-6 md:px-10 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          {/* <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to open roles
          </Link> */}

          <div className="mt-6">
            {job.featured && (
              <span className="inline-block rounded-full bg-[#2547d0] text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 mb-4">
                Featured role
              </span>
            )}

            <p className="font-mono text-xs text-[#2547d0]/90">{job.id}</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2 leading-tight">
              {job.title}
            </h1>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-white/40" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-white/40" />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BriefcaseBusiness className="w-4 h-4 text-white/40" />
              {job.experience}
            </span>
          </div>
        </div>
      </div>

      {/* Form card — full width to breathe on laptop, no fixed-height scroll region needed */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10 py-10 sm:py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {view === "form" && (
            <ApplyForm
              job={job}
              onBack={() => router.push("/careers")}
              onSubmitted={(data) => {
                setApplicant(data);
                setView("success");
              }}
            />
          )}

          {view === "success" && (
            <SuccessScreen
              job={job}
              applicant={applicant}
              onClose={() => router.push("/careers")}
            />
          )}
        </div>
      </div>
    </main>
  );
}

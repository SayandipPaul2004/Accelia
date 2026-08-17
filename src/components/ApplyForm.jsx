"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  coverNote: "",
};

export default function ApplyForm({ job, onBack, onSubmitted }) {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: null }));
  }

  function validateFile(f) {
    const okTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!okTypes.includes(f.type)) {
      return "Please upload a PDF or Word document.";
    }
    if (f.size > 5 * 1024 * 1024) {
      return "File must be under 5MB.";
    }
    return null;
  }

  function handleFile(f) {
    if (!f) return;
    const err = validateFile(f);
    if (err) {
      setErrors((er) => ({ ...er, file: err }));
      return;
    }
    setErrors((er) => ({ ...er, file: null }));
    setFile(f);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.phone.trim()) next.phone = "Required";
    if (!file) next.file = "Attach your resume/CV to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 22 + 8, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onSubmitted({ ...form, fileName: file.name }), 350);
        }
        return next;
      });
    }, 220);
  }

  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="relative w-20 h-20 mb-6">
          <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#2547d0"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 34}
              animate={{
                strokeDashoffset: 2 * Math.PI * 34 * (1 - progress / 100),
              }}
              transition={{ ease: "easeOut", duration: 0.25 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-slate-950">
            {Math.round(progress)}%
          </div>
        </div>
        <p className="font-display font-semibold text-slate-950">
          Submitting your application&hellip;
        </p>
        <p className="text-sm text-slate-600 mt-1">Uploading {file?.name}</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 py-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#2547d0] transition-colors mb-5 outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to role details
      </button>

      <h3 className="font-display text-xl font-semibold text-slate-950">
        Apply for {job.title}
      </h3>
      <p className="font-mono text-xs text-[#2547d0] mt-1">{job.id}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass(errors.name)}
              placeholder="Jordan Rivera"
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass(errors.email)}
              placeholder="you@email.com"
            />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputClass(errors.phone)}
              placeholder="+91 98765 43210"
            />
          </Field>
          <Field label="Current location" error={null}>
            <input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              className={inputClass(null)}
              placeholder="City, Country"
            />
          </Field>
        </div>

        <Field label="LinkedIn / portfolio (optional)" error={null}>
          <input
            value={form.linkedin}
            onChange={(e) => updateField("linkedin", e.target.value)}
            className={inputClass(null)}
            placeholder="https://linkedin.com/in/..."
          />
        </Field>

        {/* CV upload */}
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-slate-600">
            Resume / CV
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`mt-2 rounded-xl border-2 border-dashed transition-colors cursor-pointer px-6 py-8 text-center ${
              dragActive
                ? "border-[#2547d0] bg-[#2547d0]/5"
                : errors.file
                  ? "border-red-400/60 bg-red-50"
                  : "border-slate-200 bg-slate-50/60 hover:border-[#2547d0]/40"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {!file ? (
              <>
                <UploadCloud className="w-6 h-6 mx-auto text-slate-400" />
                <p className="text-sm text-slate-950 mt-2">
                  <span className="text-[#2547d0] font-medium">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF or Word, up to 5MB
                </p>
              </>
            ) : (
              <div
                className="flex items-center justify-between gap-3 bg-white rounded-lg border border-slate-200 px-4 py-3 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-5 h-5 text-[#2547d0] shrink-0" />
                  <span className="text-sm text-slate-950 truncate">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="shrink-0 text-slate-400 hover:text-red-500 transition-colors outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <AnimatePresence>
            {errors.file && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-red-500 mt-1.5"
              >
                {errors.file}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Field label="Why this role? (optional)" error={null}>
          <textarea
            value={form.coverNote}
            onChange={(e) => updateField("coverNote", e.target.value)}
            rows={4}
            className={inputClass(null) + " resize-none"}
            placeholder="A couple of sentences on why you'd be a good fit..."
          />
        </Field>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-full bg-[#2547d0] hover:bg-[#1d3aa8] transition-colors text-white font-semibold py-3.5 outline-none"
        >
          Submit application
        </motion.button>
        <p className="text-xs text-slate-400 text-center">
          By applying you agree to let Accelia store your details for this
          hiring process.
        </p>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-slate-600">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputClass(error) {
  return `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-[#2547d0]/20 ${
    error ? "border-red-400/70" : "border-slate-200 focus:border-[#2547d0]/60"
  }`;
}

export function SuccessScreen({ job, applicant, onClose }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <CheckCircle2 className="w-16 h-16 text-[#2547d0]" strokeWidth={1.5} />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="font-display text-xl font-semibold text-slate-950 mt-5"
      >
        Application received
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-sm text-slate-600 mt-2 max-w-sm"
      >
        Thanks, {applicant?.name?.split(" ")[0] || "there"} &mdash; we've
        received your application for{" "}
        <span className="text-slate-950 font-medium">{job.title}</span> (
        {job.id}). Our talent team reviews every submission and will reach out
        within 5&ndash;7 business days.
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="mt-8 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-950 hover:border-[#2547d0]/50 hover:text-[#2547d0] transition-colors outline-none"
      >
        Back to open roles
      </motion.button>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  coverNote: "",
  consent: false,
};

const REQUIRED_FIELDS = ["name", "email", "phone"];

export default function ApplyForm({ job, onBack, onSubmitted }) {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  function validateField(key, value) {
    switch (key) {
      case "name":
        return value.trim() ? null : "Full name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address";
        return null;
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[\d\s()+-]{7,}$/.test(value))
          return "Enter a valid phone number";
        return null;
      default:
        return null;
    }
  }

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors((er) => ({ ...er, [key]: validateField(key, value) }));
    }
  }

  function handleBlur(key) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validateField(key, form[key]) }));
  }

  function handleConsentChange(checked) {
    setForm((f) => ({ ...f, consent: checked }));
    setErrors((er) => ({
      ...er,
      consent: checked ? null : "Please accept to continue",
    }));
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
    REQUIRED_FIELDS.forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) next[key] = err;
    });
    if (!file) next.file = "Attach your resume/CV to continue";
    if (!form.consent) next.consent = "Please accept to continue";
    setErrors(next);
    setTouched({ name: true, email: true, phone: true });
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      document
        .getElementById(`field-${firstErrorKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
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
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
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
          <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-medium text-slate-950">
            {Math.round(progress)}%
          </div>
        </div>
        <p className="font-display font-semibold text-slate-950">
          Submitting your application&hellip;
        </p>
        <p className="text-sm text-slate-500 mt-1.5">
          Uploading <span className="text-slate-700">{file?.name}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#2547d0] transition-colors mb-6 outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Careers
      </button>

      <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
        <div>
          <h3 className="font-display text-2xl font-semibold text-slate-950 tracking-tight">
            Apply for {job.title}
          </h3>
          <p className="font-mono text-xs text-[#2547d0] mt-1.5 tracking-wide">
            {job.id}
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500 shrink-0">
          Est. 3 min
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Personal information */}
        <section>
          <SectionHeading title="Personal information" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              id="name"
              label="Full name"
              required
              error={touched.name ? errors.name : null}
            >
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={inputClass(touched.name && errors.name)}
                  placeholder="Jordan Rivera"
                />
              </div>
            </Field>

            <Field
              id="email"
              label="Email"
              required
              error={touched.email ? errors.email : null}
            >
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputClass(touched.email && errors.email)}
                  placeholder="you@email.com"
                />
              </div>
            </Field>

            <Field
              id="phone"
              label="Phone"
              required
              error={touched.phone ? errors.phone : null}
            >
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={inputClass(touched.phone && errors.phone)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </Field>

            <Field id="location" label="Current location">
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  className={inputClass(null)}
                  placeholder="City, Country"
                />
              </div>
            </Field>
          </div>

          <div className="mt-5">
            <Field id="linkedin" label="LinkedIn / portfolio">
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={form.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  className={inputClass(null)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </Field>
          </div>
        </section>

        {/* Resume */}
        <section>
          <SectionHeading title="Resume" />
          <div id="field-file">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-600">
                Resume / CV <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                PDF or Word, up to 5MB
              </span>
            </div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`rounded-xl border-2 border-dashed transition-all cursor-pointer px-6 py-9 text-center ${
                dragActive
                  ? "border-[#2547d0] bg-[#2547d0]/[0.04] scale-[1.01]"
                  : errors.file
                    ? "border-red-300 bg-red-50/60"
                    : "border-slate-200 bg-slate-50/50 hover:border-[#2547d0]/40 hover:bg-[#2547d0]/[0.02]"
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
                  <div className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto">
                    <UploadCloud className="w-5 h-5 text-[#2547d0]" />
                  </div>
                  <p className="text-sm text-slate-950 mt-3">
                    <span className="text-[#2547d0] font-semibold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                </>
              ) : (
                <div
                  className="flex items-center justify-between gap-3 bg-white rounded-lg border border-slate-200 shadow-sm px-4 py-3.5 text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#2547d0]/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#2547d0]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-slate-950 font-medium truncate block">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors outline-none"
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
        </section>

        {/* Cover note */}
        <section>
          <SectionHeading title="Cover note" />
          <Field id="coverNote" label="Why this role?">
            <textarea
              value={form.coverNote}
              onChange={(e) => updateField("coverNote", e.target.value)}
              rows={4}
              maxLength={600}
              className={inputClass(null) + " resize-none pl-3.5"}
              placeholder="A couple of sentences on why you'd be a good fit..."
            />
            <div className="flex justify-end mt-1">
              <span className="text-[11px] text-slate-400">
                {form.coverNote.length}/600
              </span>
            </div>
          </Field>
        </section>

        {/* Consent */}
        <div id="field-consent" className="pt-2">
          <label
            htmlFor="consent"
            className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 cursor-pointer transition-colors ${
              errors.consent
                ? "border-red-300 bg-red-50/60"
                : "border-slate-200 bg-slate-50/50 hover:border-[#2547d0]/40"
            }`}
          >
            <input
              id="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => handleConsentChange(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2547d0] focus:ring-[#2547d0]/30 accent-[#2547d0] shrink-0"
            />
            <span className="text-sm text-slate-600 leading-snug">
              I agree to let Accelia store and process my details for this
              hiring process. <span className="text-red-500">*</span>
            </span>
          </label>
          <AnimatePresence>
            {errors.consent && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-red-500 mt-1.5 ml-1"
              >
                {errors.consent}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-full bg-[#2547d0] hover:bg-[#1d3aa8] transition-colors text-white font-semibold py-3.5 shadow-lg shadow-[#2547d0]/20 outline-none"
        >
          Submit application
        </motion.button>
      </form>
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h4>
      <div className="h-px flex-1 bg-slate-100" />
    </div>
  );
}

function Field({ id, label, required, error, children }) {
  return (
    <div id={id ? `field-${id}` : undefined}>
      <label className="text-xs font-medium uppercase tracking-wide text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
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
  return `w-full rounded-lg border bg-white pl-10 pr-3.5 py-2.5 text-sm text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:ring-4 focus:ring-[#2547d0]/10 shadow-sm ${
    error
      ? "border-red-300 focus:border-red-400"
      : "border-slate-200 focus:border-[#2547d0]/60"
  }`;
}

export function SuccessScreen({ job, applicant, onClose }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="w-16 h-16 rounded-full bg-[#2547d0]/10 flex items-center justify-center"
      >
        <CheckCircle2 className="w-9 h-9 text-[#2547d0]" strokeWidth={1.5} />
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

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------- data ---------------- */

const contactMethods = [
  {
    label: "acceliaclinicalsolution@gmail.com",
    sub: "Have a project in mind? Send a message.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "+91 8282986162",
    sub: "We're interested in working together.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "Kolkata, West Bengal, India",
    sub: "Would you like to join our growing team?",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "What is a Site Management Organization (SMO)?",
    a: "A Site Management Organization supports clinical trial sites by managing trial logistics such as feasibility, contracts, regulatory submissions, and payments. Accelia acts as a bridge between Sponsors and CROs and investigative sites.",
  },
  {
    q: "How do I register my site with Accelia?",
    a: "Fill out the Organization Details form on this page. Our partnerships team will reach out within two business days to walk through onboarding and required documentation.",
  },
  {
    q: "What types of studies does Accelia support?",
    a: "We support Phase I through Phase IV trials across multiple therapeutic areas, including cardiology, oncology, neurology, and metabolic disease.",
  },
  {
    q: "What makes Accelia different from other SMOs?",
    a: "We combine a vetted site network with real-time enrollment data, so sponsors match faster and sites spend less time on administrative overhead.",
  },
  {
    q: "Do you support diverse patient populations?",
    a: "Yes. Our network includes community-based sites purposely selected to broaden access and improve representation in trial enrollment.",
  },
  {
    q: "What is the cost for Sponsors and CROs to work with Accelia?",
    a: "Pricing depends on study scope and site count. Reach out through the form and our team will put together a proposal tailored to your trial.",
  },
];

/* ---------------- shared bits ---------------- */

function Field({
  label,
  placeholder,
  name,
  type = "text",
  full = false,
  required = false,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-sm font-medium text-slate-500 mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-xl border px-4 py-3 text-slate-800 placeholder:text-slate-300 outline-none focus:ring-4 transition-all ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-[#2436C4] focus:ring-[#2436C4]/10"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  placeholder,
  options,
  name,
  required = false,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 mb-2">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-slate-800 outline-none focus:ring-4 transition-all ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-[#2436C4] focus:ring-[#2436C4]/10"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

/* ---------------- validation ---------------- */

const initialFormState = {
  organizationName: "",
  organizationType: "",
  email: "",
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  therapeuticArea: "",
};

// Which fields are mandatory
const requiredFields = [
  "organizationName",
  "organizationType",
  "email",
  "street",
  "city",
  "state",
  "country",
  "zipCode",
];

function validateForm(values) {
  const errors = {};

  if (!values.organizationName.trim()) {
    errors.organizationName = "Organization name is required.";
  } else if (values.organizationName.trim().length < 2) {
    errors.organizationName = "Enter a valid organization name.";
  }

  if (!values.organizationType) {
    errors.organizationType = "Please select an organization type.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.street.trim()) {
    errors.street = "Street address is required.";
  }

  if (!values.city.trim()) {
    errors.city = "City is required.";
  }

  if (!values.state.trim()) {
    errors.state = "State is required.";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!values.zipCode.trim()) {
    errors.zipCode = "Zip code is required.";
  } else if (!/^\d{4,10}(-\d{4})?$/.test(values.zipCode.trim())) {
    errors.zipCode = "Enter a valid zip code.";
  }

  // Therapeutic area is optional, no validation needed

  return errors;
}

/* ---------------- page ---------------- */

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!heroRef.current || !heroBgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(heroBgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Live-clear the error for that field as soon as it becomes valid
    if (touched[name]) {
      const fieldErrors = validateForm({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateForm(values);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validateForm(values);
    setErrors(validationErrors);
    setTouched(
      requiredFields.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to the first invalid field
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorField}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Something went wrong while submitting the form.");
      }

      router.push("/success");
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to submit. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white">
      {/* ---------- Hero ---------- */}
      <section
        ref={heroRef}
        className="relative h-[560px] sm:h-[620px] overflow-hidden"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 -top-16 h-[calc(100%+4rem)]"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('assets/OIP (1).jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1650]/90 via-[#111C6B]/80 to-[#0B1650]/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-full flex flex-col justify-end pb-16 sm:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white font-extrabold tracking-tight text-4xl sm:text-6xl leading-[1.05] max-w-2xl"
          >
            Let&apos;s Start a Conversation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-white/75 text-base sm:text-lg leading-relaxed mt-5 max-w-2xl"
          >
            We empower research sites — from local clinics to multi-site
            networks — to expand their study pipeline and reduce administrative
            burden. Our platform matches you with relevant trials and gives your
            site visibility to leading global Sponsors and CROs.
          </motion.p>
        </div>
      </section>

      {/* ---------- Connect Us ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: info + cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="text-[#2436C4] font-semibold tracking-wide text-sm uppercase">
              Connect Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1650] mt-3">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-slate-500 leading-relaxed mt-4 max-w-md">
              Whether you&apos;re a sponsor looking to expand your study
              footprint or a site seeking access to premier trials, Accelia is
              ready to support your goals.
            </p>

            <div className="flex flex-col gap-4 mt-10">
              {contactMethods.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-4 shadow-sm hover:shadow-md hover:border-[#2436C4]/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-[#2436C4]/10 text-[#2436C4]">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-[#0B1650] break-words">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-10"
          >
            <h3 className="text-2xl font-bold text-[#2436C4]">
              Organization Details
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6 mt-8">
                <Field
                  label="Organization Name"
                  placeholder="Acme Research Group"
                  name="organizationName"
                  required
                  value={values.organizationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.organizationName && errors.organizationName}
                />
                <SelectField
                  label="Organization type"
                  placeholder="Select One Type"
                  name="organizationType"
                  options={["Sponsor", "CRO", "Site", "Other"]}
                  required
                  value={values.organizationType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.organizationType && errors.organizationType}
                />
                <Field
                  label="Email Address"
                  placeholder="you@example.com"
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
                <Field
                  label="Street"
                  placeholder="park street"
                  name="street"
                  required
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.street && errors.street}
                />
                <Field
                  label="City"
                  placeholder="Kolkata"
                  name="city"
                  required
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && errors.city}
                />
                <Field
                  label="State"
                  placeholder="West Bengal"
                  name="state"
                  required
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && errors.state}
                />
                <Field
                  label="Country"
                  placeholder="India"
                  name="country"
                  required
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && errors.country}
                />
                <Field
                  label="Zip Code"
                  placeholder="700124"
                  name="zipCode"
                  required
                  value={values.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zipCode && errors.zipCode}
                />
                <SelectField
                  label="Therapeutic Area"
                  placeholder="Select Therapeutic Areas"
                  name="therapeuticArea"
                  options={[
                    "Oncology",
                    "Cardiology",
                    "Neurology",
                    "Metabolic",
                    "Other",
                  ]}
                  value={values.therapeuticArea}
                  onChange={handleChange}
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-500 mt-4">{submitError}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitting}
                className="mt-10 w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2436C4] hover:bg-[#1c2ba3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
              >
                {submitting ? "Sending..." : "Send Message"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      <section className="relative overflow-hidden bg-slate-50/60 py-20 sm:py-28">
        <motion.svg
          aria-hidden
          className="hidden sm:block absolute -right-10 top-10 w-64 h-64 opacity-80"
          viewBox="0 0 200 200"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="blob1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C93F5" />
              <stop offset="100%" stopColor="#5EEAD4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#blob1)"
            d="M45,-58C58,-49,68,-34,71,-18C74,-2,70,16,60,30C50,44,34,54,16,61C-2,68,-24,72,-40,63C-56,54,-66,32,-68,10C-70,-12,-64,-33,-50,-46C-36,-59,-14,-64,4,-68C22,-72,32,-67,45,-58Z"
            transform="translate(100 100)"
          />
        </motion.svg>
        <motion.svg
          aria-hidden
          className="hidden sm:block absolute right-24 top-40 w-40 h-40 opacity-70"
          viewBox="0 0 200 200"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <defs>
            <linearGradient id="blob2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#blob2)"
            d="M40,-52C52,-44,61,-30,64,-15C67,0,64,17,55,30C46,43,31,52,14,58C-3,64,-22,66,-37,58C-52,50,-63,32,-66,13C-69,-6,-64,-27,-51,-40C-38,-53,-17,-58,1,-59C19,-60,28,-60,40,-52Z"
            transform="translate(100 100)"
          />
        </motion.svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2436C4]">
              FAQs
            </h2>
            <p className="text-slate-500 mt-5 leading-relaxed">
              Got questions? We&apos;re just a message away. Whether it&apos;s
              about our services, your account, or anything else you&apos;re
              curious about, our friendly support team is here to help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start mt-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative hidden lg:block h-[440px]"
            >
              <div className="absolute left-4 top-6 w-[85%] h-[85%] rounded-3xl bg-[#0B1650] rotate-[-4deg]" />
              <div className="absolute inset-0 w-[92%] mx-auto rounded-3xl overflow-hidden rotate-[2deg] shadow-2xl">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('/assets/doctor.jpg')" }}
                />
              </div>
            </motion.div>

            <div className="flex flex-col gap-3">
              {faqItems.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                    className={`rounded-2xl border px-5 sm:px-6 py-4 transition-colors ${
                      isOpen
                        ? "border-[#2436C4]/40 bg-white shadow-md"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="font-semibold text-slate-800">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-slate-300 text-slate-500"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-500 leading-relaxed text-sm pt-4">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

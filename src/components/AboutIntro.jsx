// components/AboutIntro.jsx
import Image from "next/image";
import Link from "next/link";

export default function AboutIntro() {
  return (
    <section className="relative overflow-hidden py-20 px-6 sm:px-10">
      {/* decorative blob shapes on the right - optional, using simple divs */}
      <div className="absolute -right-20 top-10 w-72 h-72 bg-blue-300/60 rounded-[50%] rotate-45 blur-sm -z-10 hidden lg:block" />
      <div className="absolute -right-40 top-40 w-72 h-72 bg-teal-300/60 rounded-[50%] rotate-12 blur-sm -z-10 hidden lg:block" />
      <div className="absolute -right-10 top-72 w-80 h-80 bg-cyan-300/70 rounded-[50%] -rotate-12 blur-sm -z-10 hidden lg:block" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/assets/logo.png" // 👈 update this path to your actual logo file
            alt="Clinosis"
            width={280}
            height={90}
            className="h-auto w-auto"
          />
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Accelia, LLC is a next-generation Site Management Organization (SMO)
          committed to connecting research-ready sites with leading Sponsors and
          CROs. From feasibility to startup and beyond, we streamline every step
          of the clinical trial process for faster, more successful outcomes.
        </p>

        {/* Tagline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 mb-10">
          Your Bridge Between Innovation and Execution
        </h2>

        {/* CTA button */}
        <Link
          href="/contact" // 👈 update to your actual contact/connect page route
          className="inline-flex items-center gap-3 border-2 border-blue-800 rounded-full pl-8 pr-2 py-2 text-blue-800 font-semibold hover:bg-blue-50 transition-colors"
        >
          Let&apos;s Connect
          <span className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

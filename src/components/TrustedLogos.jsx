// components/TrustedLogos.jsx
export default function TrustedLogos() {
  const logos = [
    { name: "Sanofi", src: "/logos/corporate-logo.jpg" },
    { name: "Mankind", src: "/logos/mankind.png" },
    { name: "Emcure", src: "/logos/emcure.png" },
    { name: "Sun Pharma", src: "/logos/Sun-pharma.webp" },
    { name: "IGC Pharma", src: "/logos/igc-pharma.png" },
    { name: "Cipla", src: "/logos/cipla.jpg" },
  ];

  // duplicate the array so the loop feels seamless (no gap/jump when it restarts)
  const loopLogos = [...logos, ...logos];

  return (
    <section className="py-16 md:py-20 px-6 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary text-center mb-12 md:mb-16">
        Organizations We&apos;ve Supported in Clinical Research
      </h2>

      {/* marquee track */}
      <div className="relative w-full">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee items-center">
          {loopLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center shrink-0 w-32 h-20 sm:w-40 sm:h-24 md:w-52 md:h-28 mx-6 md:mx-10"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full w-auto h-auto object-contain hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500 italic text-center max-w-3xl mx-auto mt-10 md:mt-14 px-4">
        The logos shown represent organizations with whom Clinosis, or our
        affiliated research sites, have been involved in clinical trial support.
        Inclusion of these logos does not imply endorsement, sponsorship, or
        formal partnership. All trademarks and registered trademarks are the
        property of their respective owners.
      </p>
    </section>
  );
}

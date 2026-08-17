// components/NetworkStats.jsx
export default function NetworkStats() {
  const stats = [
    { value: "231", suffix: "+", label: "Sites" },
    { value: "545", suffix: "+", label: "Investigators" },
    { value: "36", suffix: "", label: "States" },
    { value: "102", suffix: "+", label: "Clinical Trials" },
  ];

  return (
    <section className="py-20">
      {/* Heading + subtext */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-6">
          A Vast Network, Built for Your Trial&apos;s Success
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          From bustling cities to underserved communities, our coast-to-coast
          footprint ensures the right sites, the right investigators, and the
          right patients—wherever your study needs them.
        </p>
      </div>

      {/* Gradient stats banner */}
      <div className="bg-gradient-to-r from-[#0A1730] via-[#0F3B6B] to-[#1E6FA8] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center md:text-left">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl sm:text-5xl font-extrabold text-white">
                {stat.value}
                <span className="text-3xl sm:text-4xl">{stat.suffix}</span>
              </p>
              <p className="text-white/80 text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

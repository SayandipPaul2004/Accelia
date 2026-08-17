// app/solutions/page.jsx
"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionsPage() {
  const sectionRef = useRef(null);

  const solutions = [
    {
      title: "End-to-End Study Execution",
      slug: "End-to-End Study Execution",
      description:
        "Versatile sites for multi-system trials and chronic condition management.",
      image: "/logos/doc.jpg",
    },
    {
      title: "GCP Compliance Training & Workshops",
      slug: "GCP Compliance Training & Workshops",
      description:
        "Child-focused sites skilled in ethical and efficient pediatric study delivery.",
      image: "/logos/gcp.webp",
    },
    {
      title: "Clinical Trials Operations & Management",
      slug: "Clinical Trials Operations & Management",
      description:
        "Experienced sites for trials in Alzheimer's, epilepsy, MS, and other CNS disorders.",
      image: "logos/clinical.webp",
    },
    {
      title: "Skilled Clinical Research Workforce",
      slug: "Skilled Clinical Research Workforce",
      description:
        "Specialized sites equipped for cardiovascular and metabolic trials.",
      image: "/logos/Skilled.jpg",
    },
    {
      title: "Participant Recruitment & Retention",
      slug: "Participant Recruitment & Retention",
      description:
        "Dedicated sites with experience across solid tumor and hematologic malignancy trials.",
      image: "/logos/OIP.jpg",
    },
    {
      title: "Ethics Committee Registration & Regulatory Affairs",
      slug: "Ethics Committee Registration & Regulatory Affairs",
      description:
        "Sites focused on reproductive, maternal, and gynecological research.",
      image: "/logos/regulatory-affairs.jpg",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".solution-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-white">
      <Navbar />

      {/* hero — full-bleed image with navy overlay, navbar floats on top */}
      <section className="relative min-h-[480px] sm:min-h-[560px] flex items-end overflow-hidden">
        <img
          src="/assets/sol2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#152f8f]/70 via-[#152f8f]/55 to-[#0A1730]/90" />

        <div className="relative z-10 px-6 sm:px-10 pb-12 sm:pb-16 pt-28 max-w-4xl mx-auto sm:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            Specialized Therapeutic Solutions
          </h1>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl">
            Our network spans specialists across every major therapeutic area,
            backed by GCP-trained investigators. Our deep specialization ensures
            that Sponsors and CROs can find the right sites with the right
            patient populations—ready to deliver results.
          </p>
        </div>
      </section>

      {/* cards grid */}
      <section
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {solutions.map((item) => (
          <div
            key={item.title}
            className="solution-card group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer"
          >
            {/* background image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />

            {/* gradient overlay - darkens on hover for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1730]/95 via-[#0A1730]/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

            {/* content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                {item.description}
              </p>
              <Link
                href={`/solutions/${item.slug}`}
                className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b-2 border-white/0 group-hover:border-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 pb-1"
              >
                Learn More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

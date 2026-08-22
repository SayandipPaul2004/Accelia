"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <AboutHero backgroundImage="/assets/vm.jpg" />
      <MissionVision />
      <TeamSection />
    </main>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */
/* Navbar is rendered above by AboutPage — this hero just provides the
   background image/overlay it floats on top of. */

function AboutHero({ backgroundImage }) {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
      ).fromTo(
        paraRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="About Accelia hero"
      className="relative overflow-hidden bg-navy-950 text-white"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            role="presentation"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(37,71,208,0.88), rgba(30,58,175,0.82), rgba(10,23,48,0.75))",
          }}
        />
      </div>

      {/* ---------- Hero content ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-28 min-h-[420px] sm:min-h-[400px] md:min-h-[450px] flex flex-col justify-center">
        <h1
          ref={headingRef}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.08] max-w-2xl opacity-0"
        >
          About Accelia
        </h1>

        <p
          ref={paraRef}
          className="mt-5 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed opacity-0"
        >
          Accelia represents acceleration, agility, and forward progress, while
          Lia reflects a compassionate, people-centered approach. Together, the
          name represents a commitment to advancing clinical research with
          speed, precision, quality, and care. Accelia Clinical Solutions is a
          trusted clinical research and site-management partner for CROs and
          sponsors seeking faster study start-up, stronger site performance, and
          predictable trial delivery. We connect capable research sites,
          experienced clinical teams, and targeted patient-access strategies to
          reduce enrollment delays and operational burden. From feasibility and
          site activation to recruitment, retention, regulatory coordination,
          clinical operations, and study close-out, we provide responsive,
          compliance-focused support that protects timelines, strengthens data
          quality, and helps partners advance clinical development with
          confidence.
        </p>
      </div>
    </section>
  );
}

function MissionVision() {
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 sm:py-20 md:py-28">
      <div
        ref={introRef}
        className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 md:mb-24 opacity-0"
      >
        <span className="inline-block rounded-full bg-teal-50 text-teal-600 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
          What drives us
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary mt-5">
          Mission &amp; Vision
        </h2>
        <p className="mt-4 text-sm sm:text-base text-ink-soft leading-relaxed">
          Two ideas guide every partnership we build — where we're going, and
          why it matters.
        </p>
      </div>

      <div className="flex flex-col gap-20 sm:gap-24 md:gap-32">
        <MissionVisionRow
          eyebrow="Purpose"
          heading="Our Mission"
          body="To become one of India’s leading and most trusted Site Management Organizations, enabling CROs and sponsors to conduct clinical trials with greater speed, quality, and confidence. Through strong investigator and hospital partnerships, patient-focused recruitment, and compliant site operations, we deliver reliable trial execution that helps bring innovative therapies to patients across India."
          //points={MISSION_POINTS}To accelerate innovation in clinical trials by removing bottlenecks and aligning interests between sites and sponsors.
          image="/assets/m.jpg"
          imageAlt="Clinical research team collaborating"
          imagePosition="right"
        />
        <MissionVisionRow
          eyebrow="Direction"
          heading="Our Vision"
          body="To be the preferred strategic site-management partner for CROs and sponsors across India—known for dependable delivery, ethical excellence, high-performing research sites, and meaningful contributions to faster access to new treatments"
          //points={VISION_POINTS}
          image="/assets/vision.jpg"
          imageAlt="Team reviewing trial strategy"
          imagePosition="left"
        />
      </div>
    </section>
  );
}

function MissionVisionRow({
  eyebrow,
  heading,
  body,
  points = [],
  image,
  imageAlt,
  imagePosition = "right",
}) {
  const isImageRight = imagePosition === "right";

  const rowRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapRef = useRef(null);
  const bulletRefs = useRef([]);
  bulletRefs.current = [];

  const addBulletRef = (el) => {
    if (el && !bulletRefs.current.includes(el)) {
      bulletRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7 },
      )
        .fromTo(
          imageWrapRef.current,
          { opacity: 0, y: 28, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          bulletRefs.current,
          { opacity: 0, x: -12 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      {/* Text block */}
      <div
        ref={textRef}
        className={`opacity-0 ${isImageRight ? "md:order-1" : "md:order-2"}`}
      >
        <span className="inline-block rounded-full bg-teal-50 text-teal-600 text-xs font-semibold uppercase tracking-wider px-4 py-1.5">
          {eyebrow}
        </span>
        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary mt-5">
          {heading}
        </h3>
        <p className="mt-5 text-sm sm:text-base text-ink-soft leading-relaxed max-w-md">
          {body}
        </p>

        {points.length > 0 && (
          <ul className="mt-7 flex flex-col gap-3 max-w-md">
            {points.map((point) => (
              <li
                key={point}
                ref={addBulletRef}
                className="flex items-start gap-3 text-sm text-ink-soft opacity-0"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3 w-3"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Image block */}
      <div
        ref={imageWrapRef}
        className={`relative opacity-0 ${
          isImageRight ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Decorative accent behind the image card */}
        <div
          aria-hidden="true"
          className={`absolute -z-10 rounded-xl2 bg-teal-50 w-[85%] h-[85%] ${
            isImageRight ? "-bottom-5 -right-5" : "-bottom-5 -left-5"
          }`}
        />

        <div className="group rounded-xl2 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 aspect-[4/3] bg-navy-100">
          {image && (
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

const TEAM_MEMBERS = [
  {
    name: "Sayandip Paul",
    role: "Managing Director",
    tag: "Oncology Research",
    image: "/assets/derma.jpg",
  },
];

function TeamSection() {
  const introRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardRefs.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 sm:py-20 md:py-28">
      <div ref={introRef} className="mb-16 sm:mb-20 opacity-0">
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary">
          Meet Our Team
        </h2>
        <span className="mt-4 block h-1 w-16 rounded-full bg-teal-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {TEAM_MEMBERS.map((member) => (
          <TeamCard key={member.name} member={member} ref={addCardRef} />
        ))}
      </div>
    </section>
  );
}

const TeamCard = forwardRef(function TeamCard({ member }, ref) {
  return (
    <div
      ref={ref}
      className="group opacity-0 rounded-2xl border border-gray-100 bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-navy-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.04] transition-all duration-500 ease-out"
        />
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl sm:text-2xl text-primary">
          {member.name}
        </h3>
        <p className="mt-1 text-teal-600 font-semibold text-sm sm:text-base">
          {member.role}
        </p>
        <span className="mt-4 inline-block rounded-full bg-gray-100 text-primary text-xs sm:text-sm font-medium px-4 py-1.5">
          {member.tag}
        </span>
      </div>
    </div>
  );
});

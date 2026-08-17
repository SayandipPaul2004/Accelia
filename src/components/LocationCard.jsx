"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Check,
  Copy,
} from "lucide-react";

/**
 * LocationCard
 *
 * Blue/white brand card for office locations (HQ, regional office,
 * remote-first team, etc). Built to match the Accelia navy-and-white
 * visual language.
 *
 * - Entrance animation is handled by the PARENT grid (ScrollTrigger on
 *   [data-card] wrappers) — this component intentionally has no internal
 *   IntersectionObserver, since having two competing reveal animations on
 *   nested elements caused some cards to get stuck at opacity: 0 while
 *   still occupying their grid space (a visible "gap").
 * - Hover: card lifts, top accent bar sweeps in, arrow glides.
 * - Tap-to-copy for phone + email with a small check-mark confirmation.
 * - Fully responsive: single column on mobile, comfortable tap targets,
 *   text wraps cleanly at narrow widths.
 *
 * Props:
 *   location: {
 *     id, tag, city, country, address, phone, email, hours,
 *     mapUrl?  // optional external link for the corner arrow
 *   }
 *   active:  boolean  // externally-controlled highlight (e.g. paired map)
 *   onHover: (id) => void
 */
export default function LocationCard({ location, active = false, onHover }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const arrowRef = useRef(null);
  const [copied, setCopied] = useState(null); // "phone" | "email" | null

  // Hover: sweep the top accent bar and nudge the arrow.
  const handleEnter = () => {
    onHover?.(location.id);
    gsap.to(barRef.current, { scaleX: 1, duration: 0.45, ease: "power2.out" });
    gsap.to(arrowRef.current, {
      x: 3,
      y: -3,
      rotate: 45,
      duration: 0.35,
      ease: "back.out(2)",
    });
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: "0 20px 40px -16px rgba(15, 45, 110, 0.25)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(barRef.current, { scaleX: 0, duration: 0.4, ease: "power2.in" });
    gsap.to(arrowRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 1px 2px 0 rgba(15, 45, 110, 0.06)",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      // clipboard unavailable — fail silently, still readable/selectable text
    }
  };

  const CardTag = location.mapUrl ? "a" : "div";

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative rounded-[1.75rem] bg-white p-6 sm:p-7 overflow-hidden transition-colors duration-300 ${
        active ? "ring-2 ring-[#2563eb]" : "ring-1 ring-[#e2e8f5]"
      }`}
      style={{ boxShadow: "0 1px 2px 0 rgba(15, 45, 110, 0.06)" }}
    >
      {/* top accent bar, sweeps in on hover */}
      <span
        ref={barRef}
        className="absolute top-0 left-0 h-1 w-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #1d4ed8, #38bdf8)",
        }}
      />

      {/* decorative corner glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.14), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span
          className="inline-flex items-center rounded-full text-[11px] font-semibold uppercase tracking-wide px-3 py-1"
          style={{ backgroundColor: "#e8f2ff", color: "#1d4ed8" }}
        >
          {location.tag}
        </span>

        <CardTag
          {...(location.mapUrl
            ? {
                href: location.mapUrl,
                target: "_blank",
                rel: "noreferrer",
                "aria-label": `Open ${location.city} on map`,
              }
            : {})}
          className="shrink-0 mt-0.5 rounded-full p-1.5 -m-1.5 hover:bg-[#f0f6ff] transition-colors"
        >
          <ArrowUpRight
            ref={arrowRef}
            className="w-4 h-4"
            style={{ color: "#64748b" }}
          />
        </CardTag>
      </div>

      <h3
        className="mt-4 text-2xl sm:text-[1.7rem] leading-tight font-semibold"
        style={{
          color: "#0b1e3d",
          fontFamily: "var(--font-display, 'Sora', sans-serif)",
        }}
      >
        {location.city}
      </h3>
      <p className="text-sm mt-1" style={{ color: "#8892a6" }}>
        {location.country}
      </p>

      <div className="mt-5 space-y-3.5 text-sm" style={{ color: "#334157" }}>
        <Row icon={MapPin}>
          <span>{location.address}</span>
        </Row>

        {location.phone && (
          <Row icon={Phone}>
            <CopyableField
              value={location.phone}
              copied={copied === "phone"}
              onCopy={() => copyToClipboard(location.phone, "phone")}
            />
          </Row>
        )}

        {location.email && (
          <Row icon={Mail}>
            <CopyableField
              value={location.email}
              copied={copied === "email"}
              onCopy={() => copyToClipboard(location.email, "email")}
              breakAll
            />
          </Row>
        )}

        {location.hours && (
          <Row icon={Clock}>
            <span>{location.hours}</span>
          </Row>
        )}
      </div>
    </div>
  );
}

function Row({ icon: Icon, children }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span
        className="shrink-0 mt-0.5 grid place-items-center w-6 h-6 rounded-lg"
        style={{ backgroundColor: "#eef4ff" }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: "#1d4ed8" }} />
      </span>
      <div className="pt-0.5 min-w-0">{children}</div>
    </div>
  );
}

function CopyableField({ value, copied, onCopy, breakAll }) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className={`group inline-flex items-center gap-1.5 text-left hover:text-[#1d4ed8] transition-colors ${
        breakAll ? "break-all" : ""
      }`}
    >
      <span>{value}</span>
      <span className="shrink-0">
        {copied ? (
          <Check className="w-3 h-3" style={{ color: "#16a34a" }} />
        ) : (
          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
        )}
      </span>
    </button>
  );
}

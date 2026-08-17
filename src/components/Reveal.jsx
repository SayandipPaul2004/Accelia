// components/Reveal.jsx
"use client"; // harmless in Pages Router, but not required there — you can omit it

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({
  children,
  y = 60,
  duration = 1,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

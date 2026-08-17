// components/ScrollBox.jsx (or src/components/ScrollBox.jsx)
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollBox() {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.from(boxRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        height: "200px",
        background: "dodgerblue",
        borderRadius: "12px",
      }}
    >
      <h2 style={{ color: "white", padding: "20px" }}>I animate on scroll!</h2>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function LogoIntro({ children }) {
  const videoRef = useRef(null);

  const [showIntro, setShowIntro] = useState(true);
  const [introVisible, setIntroVisible] = useState(true);
  const [websiteVisible, setWebsiteVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleEnded = () => {
      // Start fading the video out
      setIntroVisible(false);

      // Start fading the website in
      setWebsiteVisible(true);

      // Completely remove intro after animation
      setTimeout(() => {
        setShowIntro(false);
      }, 1000);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <>
      {/* Logo Intro */}
      {showIntro && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white
          transition-opacity duration-1000 ease-in-out
          ${introVisible ? "opacity-100" : "opacity-0"}`}
        >
          <video
            ref={videoRef}
            src="/assets/intovideo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain"
          />
        </div>
      )}

      {/* Website */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          websiteVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}

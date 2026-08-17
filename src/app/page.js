// app/page.js
import Navbar from "@/components/Navbar";
import Typewriter from "@/components/Typewriter";
import AboutIntro from "@/components/AboutIntro";
import NetworkStats from "@/components/NetworkStats";
import TrustedLogos from "@/components/TrustedLogos";
export default function Home() {
  return (
    <main>
      <section className="relative min-h-screen overflow-hidden">
        <Navbar />

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20"
        >
          <source src="/assets/clinic_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/55 -z-10" />

        <div className="flex flex-col justify-center min-h-screen pt-24 px-6 sm:px-10 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase leading-[1.1] sm:leading-[1.05]">
            Welcome to Accelia Clinical Solutions{" "}
            <span className="text-teal-400 block sm:inline">
              <Typewriter
                phrases={["TRUSTED PARTNERSHIP", "THERAPEUTIC EXPERTISE"]}
              />
            </span>
          </h1>
        </div>
      </section>
      <AboutIntro />
      <NetworkStats />
      <TrustedLogos />
    </main>
  );
}

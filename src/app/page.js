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
          className="absolute inset-0 w-full h-full object-cover -z-30"
        >
          <source src="/assets/clinic_video.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(135deg, #0a1854 0%, #16307a 35%, #2c4fa8 65%, #7f97c9 100%)",
            mixBlendMode: "color",
            opacity: 0.9,
          }}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,12,40,0.85) 0%, rgba(10,20,60,0.6) 40%, rgba(20,30,70,0.35) 70%, rgba(30,40,80,0.15) 100%)",
          }}
        />

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

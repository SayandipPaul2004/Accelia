import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import LogoIntro from "@/components/LogoIntro";
import { LoadingProvider } from "@/context/LoadingContext";
import ChatbotWidget from "@/components/ChatbotWidget";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={jakarta.className}>
        <LogoIntro>
          <SmoothScroll />

          {children}

          <Navbar />
          <Footer />
          <ChatbotWidget />
        </LogoIntro>
      </body>
    </html>
  );
}

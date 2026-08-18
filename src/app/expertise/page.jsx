import ExpertiseCarousel from "@/components/ExpertiseCarousel";

const expertiseAreas = [
  {
    _id: "1",
    title: "Internal Medicine",
    desc: "Versatile sites for multi-system trials and chronic condition management.",
    icon: "🩺",
    image: "/assets/interm.jpg",
  },
  {
    _id: "2",
    title: "Oncology",
    desc: "Solid tumor and hematology trial support with experienced coordinators.",
    icon: "🎗️",
    image: "/assets/onco.jpg",
  },
  {
    _id: "3",
    title: "Cardiology",
    desc: "Cardiovascular studies backed by dedicated diagnostic infrastructure.",
    icon: "❤️",
    image: "/assets/cardio.jpg",
  },
  {
    _id: "4",
    title: "Neurology",
    desc: "Sites experienced in CNS and neurodegenerative disease protocols.",
    icon: "🧠",
    image: "/assets/neurology.png",
  },
  {
    _id: "5",
    title: "Pediatrics",
    desc: "Child-friendly sites equipped for pediatric-specific trial requirements.",
    icon: "🧸",
    image: "/assets/pediatric.webp",
  },
  {
    _id: "6",
    title: "Endocrinology",
    desc: "Metabolic and hormonal disorder trials, including diabetes and thyroid studies.",
    icon: "⚗️",
    image: "/assets/Endocriology.jpg",
  },
  {
    _id: "7",
    title: "Rare Disease",
    desc: "Specialized recruitment and retention strategies for low-prevalence conditions.",
    icon: "🧬",
    image: "/assets/rare.jpg",
  },
  {
    _id: "8",
    title: "Dermatology",
    desc: "Sites equipped for topical, biologic, and device-based skin condition trials.",
    icon: "🧴",
    image: "/assets/derma.jpg",
  },
  {
    _id: "9",
    title: "Psychiatry & Mental Health",
    desc: "Trained staff for CNS-related psychiatric and behavioral health protocols.",
    icon: "🧩",
    image: "/assets/m.jpg",
  },
  {
    _id: "10",
    title: "Infectious Disease",
    desc: "Rapid-start sites experienced in vaccine and antiviral trial execution.",
    icon: "🦠",
    image: "/assets/inter.jpeg",
  },
  {
    _id: "11",
    title: "Women's Health",
    desc: "Obstetric, gynecologic, and reproductive health trial capabilities.",
    icon: "🌸",
    image: "/assets/gyno.png",
  },
  {
    _id: "12",
    title: "Orthopedics",
    desc: "Musculoskeletal and post-surgical recovery trial site network.",
    icon: "🦴",
    image: "/assets/ortho.jpg",
  },
];

export default function ExpertisePage() {
  return <ExpertiseCarousel expertiseAreas={expertiseAreas} error={null} />;
}

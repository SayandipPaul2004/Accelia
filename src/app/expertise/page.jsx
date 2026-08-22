import ExpertiseCarousel from "@/components/ExpertiseCarousel";
const expertiseAreas = [
  {
    _id: "1",
    title: "Oncology",
    desc: "Delivering complex oncology trials through proven global-study experience, high-performing site operations, eligible patient access, strong recruitment, sustained retention, and quality-driven, compliant execution nationwide.",
    icon: "🎗️",
    image: "/assets/onco.jpg",
  },
  {
    _id: "2",
    title: "Cardiology",
    desc: "Accelerating cardiovascular trials through high-performing site networks, diverse cardiac patient access, targeted enrollment, long-term retention, precision-driven assessments, and compliance-focused clinical data delivery nationwide.",
    icon: "❤️",
    image: "/assets/cardio.jpg",
  },

  {
    _id: "3",
    title: "Dermatology",
    desc: "Accelerating dermatology studies through high-density patient access, targeted enrollment, retention-focused engagement, standardized skin assessments, reliable site coordination clinical data delivery nationwide.",
    icon: "🧴",
    image: "/assets/derma.jpg",
  },

  {
    _id: "4",
    title: "Internal Medicine",
    desc: "Driving scalable internal medicine studies through rapid site activation, broad patient access, stronger enrollment performance, sustained retention, quality oversight, and compliant, reliable and fast trial delivery nationwide..",
    icon: "🩺",
    image: "/assets/internalmedicine.jpg",
  },
  {
    _id: "5",
    title: "Neurology",
    desc: "Advancing complex neurology trials through experienced site coordination, patient- and caregiver-focused recruitment, sustained retention, standardized assessments, reliable data collection, and compliance-driven clinical delivery nationwide.",
    icon: "🧠",
    image: "/assets/neurology.png",
  },
  {
    _id: "6",
    title: "Pediatrics",
    desc: "Delivering child- and family-centered pediatric trials through specialized sites, ethical consent and assent processes, caregiver-led recruitment, retention support, safety-first monitoring, and precise clinical data delivery.",
    icon: "🧸",
    image: "/assets/pediatric.webp",
  },
  {
    _id: "7",
    title: "Endocrinology",
    desc: "Accelerating endocrinology and metabolic studies through high-potential site access, targeted patient enrollment, long-term retention strategies, precise visit coordination, and quality-focused, compliant trial execution.",
    icon: "⚗️",
    image: "/assets/Endocriology.jpg",
  },
  {
    _id: "8",
    title: "Gastroenterology",
    desc: "Accelerating complex gastroenterology studies through specialized site coordination, targeted patient recruitment, retention-focused engagement, efficient visit management, and high-quality, compliance-driven trial delivery nationwide.",
    image: "/assets/rare.jpg",
  },
  {
    _id: "9",
    title: "Dermatology",
    desc: "Accelerating dermatology studies through high-density patient access, targeted enrollment, retention-focused engagement, standardized skin assessments, and high-quality, compliance-driven clinical data delivery.",
    icon: "🧴",
    image: "/assets/darmato.webp",
  },
  {
    _id: "10",
    title: "Psychiatry & Mental Health",
    desc: "Advancing psychiatry and mental-health trials through specialized site networks, patient-centered recruitment, caregiver engagement, rater-training support, sustained retention, and high-integrity clinical data delivery nationwide.",
    icon: "🧩",
    image: "/assets/m.jpg",
  },
  {
    _id: "11",
    title: "Infectious Disease",
    desc: "Accelerating infectious-disease and vaccine trials through rapid site activation, outbreak-responsive recruitment, diverse patient access, close safety oversight, and agile, compliance-driven study execution nationwide.",
    icon: "🦠",
    image: "/assets/inter.jpeg",
  },
  {
    _id: "12",
    title: "Gynaecology",
    desc: "Accelia Clinical Solutions supports gynaecology trials for CROs and sponsors through rapid activation, eligible participant access, stronger retention, efficient coordination, and reliable compliance-focused study delivery.",
    icon: "🌸",
    image: "/assets/Gynaecology.jpg",
  },
  {
    _id: "13",
    title: "Orthopedics",
    desc: "Driving orthopaedic clinical trials through high-performing sites, efficient patient enrollment, follow-up-focused retention, protocol-aligned assessments, reliable coordination, and quality-driven study delivery nationwide for sponsors.",
    icon: "🦴",
    image: "/assets/ortho.jpg",
  },
];

export default function ExpertisePage() {
  return <ExpertiseCarousel expertiseAreas={expertiseAreas} error={null} />;
}

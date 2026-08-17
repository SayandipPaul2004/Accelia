export const departments = [
  "All Departments",
  "Clinical Operations",
  "Data Management",
  "Regulatory Affairs",
  "Engineering",
  "Site Management",
];

export const locations = [
  "All Locations",
  "Remote",
  "Kolkata, IN",
  "Bengaluru, IN",
  "Hyderabad, IN",
];

export const jobTypes = ["All Types", "Full-time", "Contract", "Internship"];

export const jobs = [
  {
    id: "ACC-2026-014",
    title: "Clinical Research Associate (CRA)",
    department: "Clinical Operations",
    location: "Bengaluru, IN",
    type: "Full-time",
    experience: "3-5 yrs",
    posted: "2026-08-02",
    featured: true,
    summary:
      "Monitor site performance across active trials, ensure protocol and GCP compliance, and serve as the primary liaison between sponsors and investigative sites.",
    responsibilities: [
      "Conduct site initiation, monitoring, and close-out visits per protocol and SOPs",
      "Verify source data against CRFs and resolve data discrepancies with site staff",
      "Track site-level enrollment, drug accountability, and regulatory document currency",
      "Escalate protocol deviations and safety findings to the clinical lead promptly",
    ],
    requirements: [
      "Bachelor\u2019s degree in life sciences, nursing, or related field",
      "3+ years of on-site or remote monitoring experience in a CRO/SMO setting",
      "Working knowledge of ICH-GCP and applicable regulatory frameworks",
      "Willingness to travel up to 40% within region",
    ],
    niceToHave: [
      "Experience with EDC systems such as Medidata or Veeva",
      "Therapeutic area experience in oncology or cardiology",
    ],
  },
  {
    id: "ACC-2026-021",
    title: "Clinical Data Manager",
    department: "Data Management",
    location: "Remote",
    type: "Full-time",
    experience: "4-7 yrs",
    posted: "2026-07-28",
    featured: false,
    summary:
      "Own data quality end-to-end \u2014 from CRF design through database lock \u2014 partnering with biostatistics and clinical ops to keep trial data audit-ready.",
    responsibilities: [
      "Design and validate CRFs, edit checks, and data management plans",
      "Run listing reviews and query management to resolve data discrepancies",
      "Coordinate database lock activities and reconciliation with safety data",
      "Maintain data standards alignment with CDISC/SDTM where applicable",
    ],
    requirements: [
      "Bachelor\u2019s or master\u2019s degree in a quantitative or life sciences field",
      "4+ years in clinical data management within a CRO, SMO, or sponsor organization",
      "Hands-on experience with at least one major EDC platform",
      "Strong SQL or scripting skills for data review",
    ],
    niceToHave: [
      "CDISC/SDTM implementation experience",
      "Exposure to risk-based quality management (RBQM)",
    ],
  },
  {
    id: "ACC-2026-009",
    title: "Regulatory Affairs Specialist",
    department: "Regulatory Affairs",
    location: "Hyderabad, IN",
    type: "Full-time",
    experience: "2-4 yrs",
    posted: "2026-07-15",
    featured: false,
    summary:
      "Prepare and maintain regulatory submissions and site-level documentation to keep trials compliant across the site network.",
    responsibilities: [
      "Compile and track IRB/EC submissions and approvals across active sites",
      "Maintain the regulatory binder and essential document currency",
      "Support audit and inspection readiness activities",
      "Liaise with sponsors and site coordinators on documentation timelines",
    ],
    requirements: [
      "Degree in life sciences, pharmacy, or related discipline",
      "2+ years in a regulatory or site-facing clinical trial role",
      "Familiarity with local and ICH-GCP regulatory requirements",
      "Excellent document control and organizational skills",
    ],
    niceToHave: ["Experience with eRegulatory / eTMF platforms"],
  },
  {
    id: "ACC-2026-031",
    title: "Frontend Engineer, React",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "2-5 yrs",
    posted: "2026-08-10",
    featured: true,
    summary:
      "Build the interfaces clinical teams rely on daily \u2014 dashboards, site workflows, and applicant experiences \u2014 as part of the core product team.",
    responsibilities: [
      "Ship responsive, accessible React/Next.js interfaces used by site staff and admins",
      "Collaborate with design on interaction and motion detail for key workflows",
      "Work closely with backend engineers on REST API contracts",
      "Own performance, testing, and code quality within the frontend codebase",
    ],
    requirements: [
      "2+ years building production React applications",
      "Comfort with modern CSS, component architecture, and state management",
      "An eye for polish \u2014 spacing, motion, and responsive behavior matter here",
      "Experience shipping to real users, not just personal projects",
    ],
    niceToHave: [
      "Experience with Next.js App Router",
      "Familiarity with healthcare or regulated software",
    ],
  },
  {
    id: "ACC-2026-006",
    title: "Site Management Associate",
    department: "Site Management",
    location: "Kolkata, IN",
    type: "Full-time",
    experience: "1-3 yrs",
    posted: "2026-06-30",
    featured: false,
    summary:
      "Support day-to-day coordination between Accelia-managed sites and sponsors \u2014 scheduling, supply logistics, and communications.",
    responsibilities: [
      "Coordinate site visit scheduling and logistics across the site network",
      "Track investigational product and supply inventory at assigned sites",
      "Maintain communication logs between sites, sponsors, and internal teams",
      "Assist with onboarding new site staff to Accelia workflows",
    ],
    requirements: [
      "Bachelor\u2019s degree in any discipline; life sciences preferred",
      "1+ years of coordination or operations experience",
      "Strong written and verbal communication skills",
      "Comfortable working across multiple stakeholders and deadlines",
    ],
    niceToHave: ["Prior internship or role within a clinical research setting"],
  },
  {
    id: "ACC-2026-038",
    title: "QA & Compliance Intern",
    department: "Regulatory Affairs",
    location: "Kolkata, IN",
    type: "Internship",
    experience: "0-1 yrs",
    posted: "2026-08-12",
    featured: false,
    summary:
      "A six-month rotation supporting quality checks and documentation audits across Accelia\u2019s site quality management system.",
    responsibilities: [
      "Assist with internal audits of site documentation and processes",
      "Help maintain SOP version control and training records",
      "Support preparation of quality metrics reporting",
      "Shadow regulatory and QA team activities across live trials",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree in life sciences or pharmacy",
      "Strong attention to detail and documentation habits",
      "Available for a 6-month full-time internship",
    ],
    niceToHave: ["Coursework in GCP, pharmacovigilance, or quality systems"],
  },
];

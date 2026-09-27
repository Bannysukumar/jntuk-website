/**
 * Central SEO config for canonical URLs, sitemap, and schema.
 * Used by metadata, sitemap, robots, and structured data.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://jntuk-website.vercel.app";

/** Sitelink candidate URLs for sitemap and Quick Links (homepage). */
export const SITELINK_URLS = [
  { path: "/", name: "JNTUK Results Home" },
  { path: "/academicallresult", name: "All Results" },
  { path: "/academicresult", name: "Academic Result" },
  { path: "/backlogreport", name: "Backlog Report" },
  { path: "/creditchecker", name: "Credits Checker" },
  { path: "/resultcontrast", name: "Result Contrast" },
  { path: "/grace-marks/eligibility", name: "Grace Marks Eligibility" },
  { path: "/grace-marks/proof", name: "Grace Marks Proof" },
  { path: "/calendars", name: "Calendars" },
  { path: "/syllabus", name: "Syllabus" },
  { path: "/carrers", name: "Jobs & Careers" },
  { path: "/notifications", name: "Notifications" },
  { path: "/helpcenter", name: "Help Center" },
  { path: "/student-resources", name: "Student Resources" },
  // SEO landing pages
  { path: "/jntuk-results", name: "JNTUK Results" },
  { path: "/jntuk-btech-results", name: "JNTUK B.Tech Results" },
  { path: "/jntuk-r18-results", name: "JNTUK R16 Results" },
  { path: "/jntuk-r22-results", name: "JNTUK R20 / R23 Results" },
  { path: "/jntuk-1-1-results", name: "JNTUK 1-1 Results" },
  { path: "/jntuk-1-2-results", name: "JNTUK 1-2 Results" },
  { path: "/jntuk-2-1-results", name: "JNTUK 2-1 Results" },
  { path: "/jntuk-3-1-results", name: "JNTUK 3-1 Results" },
  { path: "/jntuk-supply-results", name: "JNTUK Supply Results" },
  { path: "/jntuk-revaluation-results", name: "JNTUK Revaluation Results" },
  { path: "/jntuk-4-1-results", name: "JNTUK 4-1 Results" },
  { path: "/jntuk-bpharmacy-results", name: "JNTUK B.Pharmacy Results" },
  { path: "/jntuk-mtech-results", name: "JNTUK M.Tech Results" },
] as const;

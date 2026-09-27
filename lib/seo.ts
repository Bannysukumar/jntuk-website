/**
 * Central SEO config for canonical URLs, sitemap, and schema.
 */
export const SITE_URL = "https://jntuk-website.vercel.app";

/** Sitelink candidate URLs for sitemap and Quick Links (homepage). */
export const SITELINK_URLS = [
  { path: "/", name: "JNTUK Results Home" },
  { path: "/academicallresult", name: "All Results" },
  { path: "/academicresult", name: "Academic Result" },
  { path: "/backlogreport", name: "Backlog Report" },
  { path: "/creditchecker", name: "Credits Checker" },
  { path: "/resultcontrast", name: "Result Contrast" },
  { path: "/calendars", name: "Calendars" },
  { path: "/syllabus", name: "Syllabus" },
  { path: "/careers", name: "Jobs & Careers" },
  { path: "/notifications", name: "Notifications" },
  { path: "/helpcenter", name: "Help Center" },
  { path: "/student-resources", name: "Student Resources" },
  { path: "/jntuk-results", name: "JNTUK Results" },
  { path: "/jntuk-btech-results", name: "JNTUK B.Tech Results" },
  { path: "/jntuk-supply-results", name: "JNTUK Supply Results" },
  { path: "/jntuk-revaluation-results", name: "JNTUK Revaluation Results" },
  { path: "/jntuk-bpharmacy-results", name: "JNTUK B.Pharmacy Results" },
  { path: "/jntuk-mtech-results", name: "JNTUK M.Tech Results" },
] as const;

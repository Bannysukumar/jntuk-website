import { MetadataRoute } from "next";
import { SITE_URL, SITELINK_URLS } from "@/lib/seo";

/** Extra public pages that should be indexed but are not homepage sitelinks. */
const EXTRA_PUBLIC_PATHS = [
  "/classresult",
  "/about",
  "/contact",
  "/faq",
  "/guide",
  "/privacy",
  "/disclaimer",
  "/feedback",
] as const;

const PRIORITY: Record<string, number> = {
  "/": 1,
  "/academicresult": 0.95,
  "/academicallresult": 0.95,
  "/jntuk-results": 0.95,
  "/jntuk-btech-results": 0.93,
  "/student-resources": 0.92,
  "/backlogreport": 0.9,
  "/notifications": 0.9,
  "/jntuk-r18-results": 0.9,
  "/jntuk-r22-results": 0.9,
  "/jntuk-1-1-results": 0.9,
  "/jntuk-1-2-results": 0.9,
  "/jntuk-2-1-results": 0.9,
  "/jntuk-3-1-results": 0.9,
  "/jntuk-4-1-results": 0.9,
  "/jntuk-supply-results": 0.9,
  "/jntuk-revaluation-results": 0.9,
  "/jntuk-bpharmacy-results": 0.88,
  "/jntuk-mtech-results": 0.88,
  "/classresult": 0.85,
  "/creditchecker": 0.85,
  "/resultcontrast": 0.85,
  "/grace-marks/eligibility": 0.85,
  "/grace-marks/proof": 0.85,
  "/syllabus": 0.8,
  "/calendars": 0.8,
  "/carrers": 0.8,
  "/guide": 0.75,
  "/faq": 0.75,
  "/helpcenter": 0.7,
  "/about": 0.6,
  "/contact": 0.6,
  "/privacy": 0.4,
  "/disclaimer": 0.4,
  "/feedback": 0.4,
};

function changeFrequency(
  path: string
): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> {
  if (path === "/" || path === "/notifications") return "daily";
  if (
    path === "/academicresult" ||
    path === "/academicallresult" ||
    path.startsWith("/jntuk-")
  ) {
    return "weekly";
  }
  if (path === "/syllabus" || path === "/calendars") return "monthly";
  if (path === "/privacy" || path === "/disclaimer" || path === "/about") {
    return "yearly";
  }
  return "weekly";
}

function toAbsoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = Array.from(
    new Set([...SITELINK_URLS.map((item) => item.path), ...EXTRA_PUBLIC_PATHS])
  );

  return paths.map((path) => ({
    url: toAbsoluteUrl(path),
    lastModified: now,
    changeFrequency: changeFrequency(path),
    priority: PRIORITY[path] ?? 0.6,
  }));
}

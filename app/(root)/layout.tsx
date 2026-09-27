import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

const HOME_TITLE = "⚡ JNTUK Results 2025 – BTech, BPharmacy, RCRV | JNTUK RESULTS";
const HOME_DESCRIPTION =
  "Check JNTUK results 2025, JNTUK BTech results, RCRV, and supply results online. JNTUK RESULTS – official portal for JNTUK exam results, grades, CGPA, backlogs. Academic Results, Backlog Report, Class Results, Credit Checker, Grace Marks, Syllabus, Notifications.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  keywords: [
    "jntuk results",
    "jntuk results 2025",
    "jntuk btech results",
    "jntuk rcrv results",
    "jntuk supply results",
    "jntuk results",
    "jntuk exam results",
    "jntuk results online",
    "jntuk bpharmacy results",
    "jntuk mtech results",
    "jntuk mba results",
    "jntuk mca results",
    "jntuk academic results",
    "jntuk backlog report",
    "jntuk all semester results",
    "jntuk results r18",
    "jntuk results r16",
    "jawaharlal nehru technological university kakinada results",
  ],
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: "JNTUK RESULTS",
    type: "website",
    locale: "en_US",
    images: [
      { url: `${SITE_URL}/jntuhresults_md.png`, width: 512, height: 512, alt: "JNTUK RESULTS Logo" },
      { url: `${SITE_URL}/icon-512x512.png`, width: 512, height: 512, alt: "JNTUK RESULTS Icon" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [`${SITE_URL}/jntuhresults_md.png`, `${SITE_URL}/icon-512x512.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "google-site-verification=2d4d1883a5e2e03b",
    other: {
      "impact-site-verification": "595ebfea-50e4-4e69-8e54-fa5f6f1c476c",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-blur-fade ">{children}</div>;
}

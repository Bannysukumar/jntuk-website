import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Student Resources — JNTUK Exams, Credits & Results Explained",
  description:
    "In-depth guides for JNTUK students: regulations, hall tickets, SGPA/CGPA, credits, supply exams, revaluation, and how to use JNTUK RESULTS responsibly.",
  alternates: { canonical: `${SITE_URL}/student-resources` },
  openGraph: {
    type: "article",
    title: "Student Resources | JNTUK RESULTS",
    description:
      "Educational articles and guidance for JNTUK students on results, credits, and examinations.",
    url: `${SITE_URL}/student-resources`,
    siteName: "JNTUK RESULTS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Resources | JNTUK RESULTS",
    description:
      "Guides on JNTUK regulations, results, credits, and more — for students.",
  },
};

export default function StudentResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

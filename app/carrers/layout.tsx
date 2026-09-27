import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jobs & Careers",
  description:
    "JNTUK jobs and careers. Find internships, placements, and kickstart your professional journey.",
  alternates: { canonical: `${SITE_URL}/carrers` },
  openGraph: {
    type: "website",
    title: "Jobs & Careers | JNTUK Results",
    description: "Find JNTUK internships, jobs, and career opportunities.",
    url: `${SITE_URL}/carrers`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Jobs & Careers | JNTUK Results", description: "Find JNTUK internships, jobs, and career opportunities." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

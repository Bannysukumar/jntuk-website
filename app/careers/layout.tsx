import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Jobs & Careers",
  description:
    "JNTUK jobs and careers. Find internships and jobs when the jobs API has listings.",
  alternates: { canonical: `${SITE_URL}/careers` },
  openGraph: {
    type: "website",
    title: "Jobs & Careers | JNTUK Results",
    description: "Find internships and jobs listed by the JNTUK jobs API.",
    url: `${SITE_URL}/careers`,
    siteName: "JNTUK RESULTS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs & Careers | JNTUK Results",
    description: "Find internships and jobs listed by the JNTUK jobs API.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

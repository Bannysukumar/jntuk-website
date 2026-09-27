import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calendars",
  description:
    "JNTUK academic calendars for the current year. Exam schedules, semester dates, and events in one place.",
  alternates: { canonical: `${SITE_URL}/calendars` },
  openGraph: {
    type: "website",
    title: "Calendars | JNTUK Results",
    description: "JNTUK academic calendars, exam schedules, and semester dates.",
    url: `${SITE_URL}/calendars`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Calendars | JNTUK Results", description: "JNTUK academic calendars, exam schedules, and semester dates." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

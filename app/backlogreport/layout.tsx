import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Backlog Report",
  description:
    "Get your JNTUK backlog report with hall ticket number. See current backlog status, subjects to clear, and plan your next steps.",
  alternates: { canonical: `${SITE_URL}/backlogreport` },
  openGraph: {
    type: "website",
    title: "Backlog Report | JNTUK Results",
    description: "Get your JNTUK backlog report. See current backlog status and subjects to clear.",
    url: `${SITE_URL}/backlogreport`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Backlog Report | JNTUK Results", description: "Get your JNTUK backlog report. See current backlog status and subjects to clear." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

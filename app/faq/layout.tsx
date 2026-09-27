import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about checking JNTUK results, hall ticket number, and using the portal.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    type: "website",
    title: "FAQ | JNTUK Results",
    description: "Frequently asked questions about JNTUK results and the portal.",
    url: `${SITE_URL}/faq`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "FAQ | JNTUK Results", description: "Frequently asked questions about JNTUK results and the portal." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

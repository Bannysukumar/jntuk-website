import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Credits Checker",
  description:
    "Check your JNTUK credits and find how many credits you need to promote to the next year or to graduate.",
  alternates: { canonical: `${SITE_URL}/creditchecker` },
  openGraph: {
    type: "website",
    title: "Credits Checker | JNTUK Results",
    description: "Check your JNTUK credits and credits required to promote or graduate.",
    url: `${SITE_URL}/creditchecker`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Credits Checker | JNTUK Results", description: "Check your JNTUK credits and credits required to promote or graduate." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

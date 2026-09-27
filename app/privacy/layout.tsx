import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for JNTUK RESULTS. How we collect, use, and protect your information.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    type: "website",
    title: "Privacy Policy | JNTUK Results",
    description: "Privacy policy for JNTUK RESULTS.",
    url: `${SITE_URL}/privacy`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Privacy Policy | JNTUK Results", description: "Privacy policy for JNTUK RESULTS." },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

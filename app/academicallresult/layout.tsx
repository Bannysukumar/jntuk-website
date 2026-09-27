import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Results",
  description:
    "View all JNTUK semester results in one place. Check every exam result you have taken with your hall ticket number.",
  alternates: { canonical: `${SITE_URL}/academicallresult` },
  openGraph: {
    type: "website",
    title: "All Results | JNTUK Results",
    description: "View all JNTUK semester results in one place. Check every exam result with your hall ticket number.",
    url: `${SITE_URL}/academicallresult`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "All Results | JNTUK Results", description: "View all JNTUK semester results in one place. Check every exam result with your hall ticket number." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

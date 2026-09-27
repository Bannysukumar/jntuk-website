import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Class Result",
  description:
    "View JNTUK class results and compare your academic performance across semesters with classmates.",
  alternates: { canonical: `${SITE_URL}/classresult` },
  openGraph: {
    type: "website",
    title: "Class Result | JNTUK Results",
    description: "View JNTUK class results and compare performance with classmates.",
    url: `${SITE_URL}/classresult`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Class Result | JNTUK Results", description: "View JNTUK class results and compare performance with classmates." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

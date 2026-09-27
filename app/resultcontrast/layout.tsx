import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Result Contrast",
  description:
    "Compare your JNTUK academic performance across semesters with a classmate. Result contrast and performance insights.",
  alternates: { canonical: `${SITE_URL}/resultcontrast` },
  openGraph: {
    type: "website",
    title: "Result Contrast | JNTUK Results",
    description: "Compare your JNTUK performance across semesters with classmates.",
    url: `${SITE_URL}/resultcontrast`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Result Contrast | JNTUK Results", description: "Compare your JNTUK performance across semesters with classmates." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

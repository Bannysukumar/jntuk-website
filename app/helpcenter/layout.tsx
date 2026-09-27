import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "JNTUK Results help center. Report bugs, get support, and find answers for using the results portal.",
  alternates: { canonical: `${SITE_URL}/helpcenter` },
  openGraph: {
    type: "website",
    title: "Help Center | JNTUK Results",
    description: "Get help, report bugs, and support for JNTUK Results portal.",
    url: `${SITE_URL}/helpcenter`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Help Center | JNTUK Results", description: "Get help, report bugs, and support for JNTUK Results portal." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "Latest JNTUK notifications, exam results announcements, and university updates in one place.",
  alternates: { canonical: `${SITE_URL}/notifications` },
  openGraph: {
    type: "website",
    title: "Notifications | JNTUK Results",
    description: "Latest JNTUK notifications and exam result announcements.",
    url: `${SITE_URL}/notifications`,
    siteName: "JNTUK RESULTS",
  },
  twitter: { card: "summary_large_image", title: "Notifications | JNTUK Results", description: "Latest JNTUK notifications and exam result announcements." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

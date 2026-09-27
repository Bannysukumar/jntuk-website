import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "JNTUK B.Tech, B.Pharamacy,M.Tech,B.Tech,M.B.A Results",
  keywords:
    "jntuk 1-1 results, jntuk 1-2 results, jntuk 2-1 results, jntuk 2-2 results, jntuk 3-1 results, jntuk 4-1 results, jntuk 4-2 results",
  robots: { index: false, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

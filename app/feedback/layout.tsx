import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Feedback | JNTUK RESULTS",
  description: "Submit your feedback and suggestions for JNTUK RESULTS",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


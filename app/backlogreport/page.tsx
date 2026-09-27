"use client";

import { useState } from "react";
import Form from "@/components/forms/resulthtnoform";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";

const BacklogReport = () => {
  const [hallticketno, sethallticketno] = useState("");
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (isCooldown) return;
    if (hallticketno.length < 10) {
      toast.error("Enter a 10-character roll number (letters and numbers only), e.g. 226Q1A4304");
      return;
    }
    setIsCooldown(true);
    router.push("/backlogreport/result?htno=" + hallticketno);
    setTimeout(() => setIsCooldown(false), 5000);
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        title="Backlog Report"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        isDisabled={isCooldown}
      />
      {/* Informational content for AdSense and user value */}
      <section className="max-w-2xl mx-auto px-4 pb-12 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Understanding Your JNTUK Backlog Report
          </h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="leading-relaxed">
              The Backlog Report lists failing subjects you have not yet passed at JNTUK. On JNTUK UG grading, E (5) is a pass and F is a fail; COMPLETED is not a backlog. Enter your 10-character hall ticket above (for example 226Q1A4304) to see a semester-wise breakdown of pending subjects.
            </p>
            <p className="leading-relaxed">
              Results are fetched from JNTUK sources. For official records, refer to documents from Jawaharlal Nehru Technological University, Kakinada and https://jntukresults.edu.in.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default BacklogReport;

"use client";

import ToolPageEditorial from "@/components/content/ToolPageEditorial";
import Form from "@/components/forms/resulthtnoform";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";

const ResultContrast = () => {
  const router = useRouter();
  const [hallticketno, sethallticketno] = useState("");
  const [hallticketno2, sethallticketno2] = useState("");
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const onSubmit = async () => {
    if (isCooldown) return;
    if (hallticketno.length < 10 || hallticketno2.length < 10) {
      toast.error("Enter a 10-character roll number (letters and numbers only), e.g. 226Q1A4304");
      return;
    }
    setIsCooldown(true);
    router.push(
      "/resultcontrast/result?htno=" + hallticketno + "&htno2=" + hallticketno2
    );
    setTimeout(() => {
      setIsCooldown(false);
      toast.dismiss();
    }, 5000);
  };

  return (
    <>
      <Form
        title="Result Contrast"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        hallticketno2={hallticketno2}
        sethallticketno2={sethallticketno2}
        onSubmit={onSubmit}
        isDisabled={isCooldown}
      />
      <ToolPageEditorial
        heading="Compare Two Students’ JNTUK Results (Result Contrast)"
        paragraphs={[
          "Result Contrast lets you compare academic performance between two valid JNTUK hall ticket numbers side by side. It is often used by classmates to compare CGPA trends, subject-wise performance, or backlogs in a single view—without sharing passwords or unofficial screenshots.",
          "Enter two 10-character hall tickets. Contrast starts only after both students return 200. If either is 202, we keep polling and show a fetching state. Different regulations or missing semesters can limit what appears.",
          "Use this feature responsibly and respect privacy: only compare hall tickets when both students agree. JNTUK RESULTS does not store your marks on our servers permanently; we display what the upstream APIs return for your session.",
        ]}
        note="This tool is for informational purposes only. Official standings and eligibility are determined by JNTUK and your institution."
      />
      <Footer />
    </>
  );
};
export default ResultContrast;

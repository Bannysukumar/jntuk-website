"use client";

import ToolPageEditorial from "@/components/content/ToolPageEditorial";
import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreditChecker = () => {
  const [hallticketno, sethallticketno] = useState<string>("");
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async () => {
    if (isCooldown) return;
    if (hallticketno.length < 10) {
      toast.error("Enter a 10-character roll number (letters and numbers only), e.g. 226Q1A4304");
      return;
    }
    setIsCooldown(true);
    router.push("/creditchecker/result?htno=" + hallticketno);
    setTimeout(() => {
      setIsCooldown(false);
      toast.dismiss();
    }, 5000);
  };

  return (
    <>
      <Form
        title="Credits Checker"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
        isDisabled={isCooldown}
      />
      <ToolPageEditorial
        heading="How the Credits Checker Helps JNTUK Students"
        paragraphs={[
          "JNTUK programmes require you to earn a minimum number of credits across core, elective, and other categories to move to the next year or to graduate. The Credits Checker reads your academic record and summarises earned credits against what is typically needed, so you can see at a glance whether you are on track.",
          "Enter your 10-character hall ticket above to generate your report. Regulations (R16, R19, R20, R23) can differ in credit rules—always confirm final requirements with your college handbook or examination branch.",
          "Data is fetched when you request it and is not permanently stored on our servers. This portal is for guidance only; the university’s official records remain the final authority.",
        ]}
      />
      <Footer />
    </>
  );
};

export default CreditChecker;

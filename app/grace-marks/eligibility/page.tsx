"use client";

import ToolPageEditorial from "@/components/content/ToolPageEditorial";
import { useState } from "react";
import Form from "@/components/forms/resulthtnoform";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/footer";

const GraceMarksEligibility = () => {
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
    router.push("/grace-marks/eligibility/result?htno=" + hallticketno);
    setTimeout(() => setIsCooldown(false), 5000);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        title="Grace Marks Eligibility"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        isDisabled={isCooldown}
      />
      <ToolPageEditorial
        heading="Understanding Grace Marks Eligibility (JNTUK)"
        paragraphs={[
          "Grace marks are sometimes applied according to university rules when a student is just short of a passing mark or needs marginal relief in specific subjects. Eligibility depends on your regulation, subject marks, and the examination branch’s current policy—not every student will qualify automatically.",
          "Only if 4-2 is already stored. If Gemini or file storage are not configured, proof upload will not work. A 404 or 406 means this hall ticket is not eligible or 4-2 is missing.",
          "Policies can change by notification; always read the latest circulars on the JNTUK website and confirm with your college examination cell before assuming you will receive grace marks.",
        ]}
        note="Displayed information is for guidance only. Final grace marks and promotion decisions rest with JNTUK."
      />
      <Footer />
    </>
  );
};

export default GraceMarksEligibility;


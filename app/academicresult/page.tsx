"use client";

import Footer from "@/components/footer/footer";
import Form from "@/components/forms/resulthtnoform";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setupPush } from "@/customhooks/setupPush";
import { isValidRollNumber, normalizeRollNumber } from "@/lib/jntuk-api";

const AcademicResult = () => {
  const [hallticketno, sethallticketno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    // This function reads text from the clipboard
    async function readClipboard() {
      try {
        const browser = navigator.userAgent.toLowerCase();
        if (browser.includes("android") || browser.includes("iphone")) {
          const text = await navigator.clipboard.readText();
          try {
            const roll = normalizeRollNumber(text);
            if (isValidRollNumber(roll)) {
              sethallticketno(roll);
            }
          } catch {
            console.log("error");
          }
        }
      } catch (err) {
        console.error("Failed to read clipboard content:", err);
      }
    }
    readClipboard();
  }, []);

  const onSubmit = async () => {
    if (isCooldown) return;
    if (!isValidRollNumber(hallticketno)) {
      toast.error("Enter a 10-character roll number (letters and numbers only), e.g. 226Q1A4304");
      return;
    }

    setIsCooldown(true);
    // Navigate immediately so result page can start fetching — don't block on push setup
    router.push("/academicresult/result?htno=" + hallticketno);
    setupPush(hallticketno).catch((err) =>
      console.warn("Push setup failed (non-blocking):", err)
    );
    setLoading(false);
    setTimeout(() => {
      setIsCooldown(false);
      toast.dismiss();
    }, 5000);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Form
        title="Academic Result"
        hallticketno={hallticketno}
        sethallticketno={sethallticketno}
        onSubmit={onSubmit}
        isDisabled={isCooldown}
      />

      {/* Informational Content for AdSense Value */}
      <section className="max-w-2xl mx-auto px-4 pb-12 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            How to Check Your JNTUK Results
          </h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p className="leading-relaxed">
              To check your results on the JNTUK RESULTS portal, follow these simple steps:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Enter your unique 10-character <strong>roll number</strong> (letters and numbers only), for example <strong>226Q1A4304</strong>.</li>
              <li>Click on the <strong>Get Results</strong> button to initiate the search.</li>
              <li>If the result is queued, the page will automatically check again in about 40 seconds.</li>
            </ul>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 font-medium mb-1">Supported Regulations</p>
              <p className="text-xs">
                Results cover regular, supply, and RCRV attempts published by JNTUK. Use Hard Refresh on the result page if you need a forced scrape.
              </p>
            </div>
            <p className="text-xs italic text-center text-gray-500 mt-6">
              Note: For official certification, always refer to the original mark sheets issued by Jawaharlal Nehru Technological University, Kakinada.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default AcademicResult;

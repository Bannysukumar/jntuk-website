"use client";

import { FileDown, RefreshCcw, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";
import QueuedState from "@/components/result/QueuedState";
import Print from "@/components/download/print";
import { fetchAcademicResult, fetchCmmPdf, fetchHardRefresh } from "@/components/api/fetchResults";
import { isValidRollNumber, normalizeRollNumber } from "@/lib/jntuk-api";
import { saveResultToLocal, isNative, hapticFeedback } from "@/lib/native-features";
import { ImpactStyle } from "@capacitor/haptics";
import toast from "react-hot-toast";

const AcademicResultResult = () => {
  const router = useRouter();
  const htno = useSearchParams().get("htno");
  const [academicResult, setAcademicResult] =
    useState<AcademicResulProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [queued, setQueued] = useState(false);
  const [cmmUrl, setCmmUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const componentRef = useRef(null);
  const isNativeApp = isNative();

  useEffect(() => {
    const currentHtno = normalizeRollNumber(htno || "");
    if (!isValidRollNumber(currentHtno)) {
      setLoading(false);
      router.push("/academicresult");
      return;
    }

    const abortController = new AbortController();
    let cancelled = false;

    const fetchResult = async () => {
      setLoading(true);
      try {
        const result = await fetchAcademicResult(currentHtno, {
          signal: abortController.signal,
          onQueued: () => setQueued(true),
        });
        if (cancelled || abortController.signal.aborted) return;
        if (result) {
          setAcademicResult(result);
          setQueued(false);
        }
      } catch (err: any) {
        const isAbort =
          err?.name === "AbortError" || err?.code === "ERR_CANCELED";
        if (!isAbort && !cancelled) {
          toast.error("Could not load this result. Try again from the form.");
        }
      } finally {
        if (!cancelled && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResult();
    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [htno, router]);

  useEffect(() => {
    if (!academicResult || !htno) return;
    let objectUrl: string | null = null;
    fetchCmmPdf(normalizeRollNumber(htno)).then((blob) => {
      if (!blob) return;
      objectUrl = URL.createObjectURL(blob);
      setCmmUrl(objectUrl);
    });
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [academicResult, htno]);

  const handleSaveResult = async () => {
    if (!academicResult || !htno) return;
    setIsSaving(true);
    await hapticFeedback(ImpactStyle.Medium);
    try {
      const result = await saveResultToLocal(htno, academicResult);
      if (result.success) {
        toast.success(result.message || "Result saved successfully!");
      } else {
        toast.error(result.message || "Failed to save result");
      }
    } catch {
      toast.error("Failed to save result");
    } finally {
      setIsSaving(false);
    }
  };

  const handleHardRefresh = async () => {
    if (!htno) return;
    const confirmed = window.confirm(
      "This re-scrapes JNTUK and can take several minutes if the portal is busy."
    );
    if (!confirmed) return;
    setLoading(true);
    setQueued(true);
    const refreshed = await fetchHardRefresh(normalizeRollNumber(htno), {
      onQueued: () => setQueued(true),
    });
    if (refreshed) {
      setAcademicResult(refreshed);
      setQueued(false);
    }
    setLoading(false);
  };

  if (queued && !academicResult) {
    return <QueuedState />;
  }

  return (
    <>
      <div className="m-2 md:m-4 text-sm md:text-base pb-24" ref={componentRef}>
        <div className="text-center grid grid-cols-3 font-semibold my-5 text-sm md:text-2xl">
          <div />
          <div>Academic Result</div>
          <div className="justify-end flex gap-2">
            {isNativeApp && academicResult && (
              <button
                onClick={handleSaveResult}
                disabled={isSaving}
                className="border border-white p-1 md:p-2 rounded cursor-pointer hover:bg-gray-800 disabled:opacity-60"
                title="Save Result"
              >
                <Save size={16} className={isSaving ? "animate-pulse" : ""} />
              </button>
            )}
            <button
              className="border border-white p-1 md:p-2 rounded cursor-pointer hover:bg-gray-800"
              title="Hard refresh from JNTUK"
              onClick={handleHardRefresh}
            >
              <RefreshCcw size={16} />
            </button>
            {cmmUrl && (
              <a
                href={cmmUrl}
                download={`cmm-${normalizeRollNumber(htno || "")}.pdf`}
                className="border border-white p-1 md:p-2 rounded cursor-pointer hover:bg-gray-800"
                title="Download CMM PDF"
              >
                <FileDown size={16} />
              </a>
            )}
          </div>
        </div>
        {academicResult ? (
          <>
            <ResultDetails details={academicResult.details} />
            <AcademicResult result={academicResult.results} academic={true} />
            <TotalResult
              CGPA={academicResult.results.CGPA}
              backlogs={academicResult.results.backlogs}
              credits={academicResult.results.credits || academicResult.results.totalCredits}
              serverStatus={
                academicResult.results.serverStatus ||
                academicResult.details?.serverStatus
              }
            />
          </>
        ) : loading ? (
          <QueuedState title="Loading result…" />
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300 py-8">
            No result is available for this hall ticket yet.
          </p>
        )}
      </div>
      <div className="flex justify-center text-xs text-gray-600 dark:text-gray-400 mb-16">
        JNTUK Results
      </div>
      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicResultResult;

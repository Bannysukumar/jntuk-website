"use client";

import { RefreshCcw, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResultDetails from "@/components/result/details";
import AcademicResult from "@/components/result/academicresult";
import TotalResult from "@/components/result/totalResult";
import ResultDetailsSkeleton from "@/components/skeleton/ResultDetailsSkeleton";
import AcademicResultSkeleton from "@/components/skeleton/AcademicResultsSkeleton";
import Print from "@/components/download/print";
import { fetchAcademicResult, fetchHardRefresh } from "@/components/api/fetchResults";
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
    let retried = false;

    const fetchResult = async () => {
      setLoading(true);
      try {
        const result = await fetchAcademicResult(currentHtno, {
          signal: abortController.signal,
        });
        if (cancelled || abortController.signal.aborted) return;
        if (result) {
          setAcademicResult(result);
        } else if (!cancelled) {
          router.push("/academicresult");
        }
      } catch (err: any) {
        const isAbort =
          err?.name === "AbortError" || err?.code === "ERR_CANCELED";
        if (isAbort && !retried && !cancelled && !abortController.signal.aborted) {
          retried = true;
          await fetchResult();
        } else if (!isAbort && !cancelled && !abortController.signal.aborted) {
          router.push("/academicresult");
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

  const handleSaveResult = async () => {
    if (!academicResult || !htno) return;

    setIsSaving(true);
    await hapticFeedback(ImpactStyle.Medium);

    try {
      const result = await saveResultToLocal(htno, academicResult);
      if (result.success) {
        toast.success(result.message || 'Result saved successfully!');
      } else {
        toast.error(result.message || 'Failed to save result');
      }
    } catch (error) {
      console.error('Error saving result:', error);
      toast.error('Failed to save result');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div
        className="m-2 text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]"
        ref={componentRef}
      >
        <div className="text-center grid grid-cols-3 font-bold my-5 text-xs lg:text-2xl">
          <div></div>
          <div className="justify-center">ACADEMIC RESULTS</div>
          <div className="justify-end flex gap-2">
            {isNativeApp && academicResult && (
              <button
                onClick={handleSaveResult}
                disabled={isSaving}
                className="border border-white p-1 md:p-2 rounded cursor-pointer justify-center items-center hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                title="Save Result"
              >
                <Save size={16} className={isSaving ? "animate-pulse" : ""} />
              </button>
            )}
            <button
              className="border border-white p-1 md:p-2 rounded cursor-pointer justify-center items-center hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              title="Hard refresh from JNTUK"
              onClick={async () => {
                if (!htno) return;
                setLoading(true);
                const refreshed = await fetchHardRefresh(normalizeRollNumber(htno));
                if (refreshed) setAcademicResult(refreshed);
                setLoading(false);
              }}
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>
        {academicResult ? (
          <>
            <ResultDetails details={academicResult.details} />
            <AcademicResult result={academicResult.results} academic={true} />
            <TotalResult
              CGPA={academicResult.results.CGPA}
              backlogs={academicResult.results.backlogs}
            />
          </>
        ) : (
          <>
            <ResultDetailsSkeleton />
            <AcademicResultSkeleton />
          </>
        )}
      </div>
      <div className="flex justify-center text-[6px] text-black">
        JNTUK RESULTS
      </div>
      {/* <QuickNavigation htno={htno} /> */}
      <Print componentRef={componentRef} />
    </>
  );
};

export default AcademicResultResult;

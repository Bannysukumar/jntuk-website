"use client";
import { getFromLocalStorage } from "@/components/customfunctions/localStorage";
import { fetchCreditContrastReport } from "@/components/api/fetchResults";
import QueuedState from "@/components/result/QueuedState";
import { displayStudentName, displayValue } from "@/lib/jntuk-api";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AttributeRowProps {
  label: string;
  value1?: string;
  value2?: string;
}
const AttributeRow: React.FC<AttributeRowProps> = ({
  label,
  value1,
  value2,
}) => (
  <tr className="w-max">
    <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white w-1/3">
      {label}
    </th>
    <th className="dark:border-white w-1/3">{value1}</th>
    <th className="dark:border-white w-1/3">{value2}</th>
  </tr>
);

function ResultContrastPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const htno = (searchParams.get("htno") || "").trim().toUpperCase();
  const htno2 = (searchParams.get("htno2") || "").trim().toUpperCase();
  const [results, setResults] = useState<CreditContrastReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [queued, setQueued] = useState(false);

  useEffect(() => {
    toast.dismiss();
    if (!htno || !htno2 || htno.length < 10 || htno2.length < 10) {
      setLoading(false);
      router.push("/resultcontrast");
      return;
    }
    const localkey = htno + "-" + htno2 + "-CreditContrastreport";
    const cached = getFromLocalStorage(localkey);
    if (cached) {
      setResults(cached);
      setLoading(false);
      return;
    }
    const abortController = new AbortController();
    let cancelled = false;
    let retried = false;
    const doFetch = async () => {
      setLoading(true);
      try {
        const ok = await fetchCreditContrastReport(htno, htno2, {
          signal: abortController.signal,
          onQueued: () => setQueued(true),
        });
        if (cancelled || abortController.signal.aborted) return;
        if (ok) {
          const data = getFromLocalStorage(localkey);
          if (data) setResults(data);
        } else {
          router.push("/resultcontrast");
        }
      } catch (err: any) {
        const isAbort = err?.name === "AbortError" || err?.code === "ERR_CANCELED";
        if (isAbort && !retried && !cancelled && !abortController.signal.aborted) {
          retried = true;
          await doFetch();
        } else if (!isAbort && !cancelled) router.push("/resultcontrast");
      } finally {
        if (!cancelled && !abortController.signal.aborted) setLoading(false);
      }
    };
    doFetch();
    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [htno, htno2, router]);

  if (loading || queued && !results) {
    return (
      <QueuedState
        title="Fetching from JNTUK…"
        message="Waiting until both hall tickets have results (200). A 202 means one or both are still being fetched from JNTUK."
      />
    );
  }
  if (results == null) {
    return (
      <div className="m-1 text-[30%] sm:text-[45%] md:text-[60%] lg:text-[100%]">
        Details not found
      </div>
    );
  }
  return (
    <div className="m-1 text-[30%] sm:text-[45%]  md:text-[60%] lg:text-[100%]">
      <div className="text-center font-bold my-4 text-xs lg:text-2xl">
        Result Contrast
      </div>
      <table className="w-[100%] mt-2  border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Personal Details</th>
          </tr>
        </tbody>
      </table>
      <table className="w-[100%]   border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white w-1/3">Student Attribute</th>
            <th className=" dark:border-white w-1/3">Student 1</th>
            <th className=" dark:border-white w-1/3">Student 2</th>
          </tr>
          <AttributeRow
            label="Name"
            value1={displayStudentName(results.studentProfiles[0]["name"], results.studentProfiles[0]["rollNumber"])}
            value2={displayStudentName(results.studentProfiles[1]["name"], results.studentProfiles[1]["rollNumber"])}
          />
          <AttributeRow
            label="Roll No"
            value1={results.studentProfiles[0]["rollNumber"]}
            value2={results.studentProfiles[1]["rollNumber"]}
          />
          <AttributeRow
            label="College Code"
            value1={results.studentProfiles[0]["collegeCode"]}
            value2={results.studentProfiles[1]["collegeCode"]}
          />
          <AttributeRow
            label="Father name"
            value1={displayValue(results.studentProfiles[0]["fatherName"])}
            value2={displayValue(results.studentProfiles[1]["fatherName"])}
          />
        </tbody>
      </table>
      <table className="w-[100%] mt-4 border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Academic Results</th>
          </tr>
        </tbody>
      </table>
      <table className="w-[100%] border-black dark:border-white">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white w-1/3">Student Attribute</th>
            <th className=" dark:border-white w-1/3">Student 1</th>
            <th className=" dark:border-white w-1/3">Student 2</th>
          </tr>
          {results.semesters.map((semester, index: number) => {
            return (
              <AttributeRow
                key={index}
                label={`${semester[0].semester} -   CGPA | CREDITS `}
                value1={
                  semester[0].semesterCredits !== "-"
                    ? `${semester[0].semesterSGPA} | ${semester[0].semesterCredits}`
                    : "-"
                }
                value2={
                  semester[1].semesterCredits !== "-"
                    ? `${semester[1].semesterSGPA} | ${semester[0].semesterCredits}`
                    : "-"
                }
              />
            );
          })}
        </tbody>
      </table>
      <table className="w-[100%] mt-4 border-black dark:border-white   ">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white">Performance Analysis</th>
          </tr>
        </tbody>
      </table>
      <table className="w-[100%] border-black dark:border-white">
        <tbody>
          <tr className="w-max bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className=" dark:border-white w-1/3">Student Attribute</th>
            <th className=" dark:border-white w-1/3">Student 1</th>
            <th className=" dark:border-white w-1/3">Student 2</th>
          </tr>
          <AttributeRow
            label="Total CGPA"
            value1={displayValue(results.studentProfiles[0]["CGPA"])}
            value2={displayValue(results.studentProfiles[1]["CGPA"])}
          />
          {/* <AttributeRow */}
          {/*   label="Percentage" */}
          {/*   value1={` ${((results.studentProfiles[0]["CGPA"]) - 0.5) * 10).toString()} %`} */}
          {/*   value2={` ${((results[1]["results"]["CGPA"] - 0.5) * 10).toString()} %`} */}
          {/* /> */}
          <AttributeRow
            label="Credits Obtained"
            value1={results.studentProfiles[0]["credits"]}
            value2={results.studentProfiles[1]["credits"]}
          />
          <AttributeRow
            label="Backlogs"
            value1={results.studentProfiles[0]["backlogs"]}
            value2={results.studentProfiles[1]["backlogs"]}
          />
        </tbody>
      </table>
    </div>
  );
}

export default ResultContrastPage;

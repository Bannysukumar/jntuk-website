import React from "react";
import Subjects from "./subjectRenderer";
import { examAttemptLabel, officialResultUrl } from "@/lib/result-display";

const AcademicAllResult = ({
  results,
}: {
  results: StudentResults;
  htno: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {results.map((semester: Semester, index: number) => {
        return (
          <div key={index}>
            <table className="dark:border-white w-[100%] rounded-t">
              <tbody>
                <tr>
                  <th className="bg-gray-200 md:bg-gray-300  dark:border-white dark:bg-[#0b3954]">
                    {semester.semester} Results
                  </th>
                </tr>
              </tbody>
            </table>
            {semester.exams.map((exam: Exam, examIndex: number) => {
              return (
                <div key={examIndex}>
                  <table className="dark:border-white dark:bg-gray-900">
                    <tbody>
                      <tr>
                        <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                          {examAttemptLabel(exam, semester.exams)}
                        </th>
                        {(exam.rcrv || exam.graceMarks) && (
                          <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                            Result Type: {exam.rcrv ? "RC/RV" : "Grace Marks"}
                          </th>
                        )}
                        <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] dark:border-white">
                          <a
                            href={officialResultUrl(exam.examCode)}
                            target="_blank"
                            className="underline"
                          >
                            Direct Link
                          </a>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <Subjects
                    semester={exam}
                    lastIndex={semester.exams.length == examIndex + 1}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      <p className="text-center text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-1">
        JNTUK publishes grade and credits only. Internal, External, and Total
        show — when the official result has no marks. Only exams JNTUK has
        published (and that were scraped) appear. Missing 1-2 / 2-2 / 4-x is
        normal, not a bug.
      </p>
    </div>
  );
};

export default AcademicAllResult;

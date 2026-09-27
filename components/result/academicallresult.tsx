import React from "react";
import Subjects from "./subjectRenderer";

const examKind = (exam: Exam) => {
  if (exam.rcrv) return "RCRV";
  if (exam.graceMarks) return "Grace marks";
  const code = (exam.examCode || "").toLowerCase();
  if (code.includes("sup")) return "Supply";
  return "Regular";
};

const AcademicAllResult = ({
  results,
}: {
  results: StudentResults;
  htno: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
        Attempts are grouped by semester and exam type. Regular, supply, and RCRV are not collapsed.
      </p>
      {results.map((semester: Semester, index: number) => (
        <div key={`${semester.semester}-${index}`}>
          <div className="result-table-wrap">
            <table className="w-full rounded-t">
              <tbody>
                <tr>
                  <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] px-2 py-2 text-left">
                    {semester.semester} results
                  </th>
                </tr>
              </tbody>
            </table>
            {semester.exams.map((exam: Exam, examIndex: number) => (
              <div key={`${exam.examCode}-${examIndex}`}>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] px-2 py-2 text-left">
                        Exam: {examKind(exam)}
                      </th>
                      <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] px-2 py-2 text-left">
                        Code: {exam.examCode || "—"}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <Subjects
                  semester={exam}
                  lastIndex={semester.exams.length === examIndex + 1}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcademicAllResult;

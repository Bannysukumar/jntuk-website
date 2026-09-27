import React from "react";
import { displayValue } from "@/lib/jntuk-api";

const markCell = (value: unknown) => {
  if (value === null || value === undefined || value === "" || Number(value) === 0) {
    return "—";
  }
  return String(value);
};

const Subjects = ({
  semester,
  lastIndex = true,
}: {
  semester: Exam;
  lastIndex: Boolean;
}) => {
  const subjects = Array.isArray(semester.subjects) ? semester.subjects : [];
  const hasMarks = subjects.some(
    (subject) =>
      Number(subject.internalMarks) > 0 ||
      Number(subject.externalMarks) > 0 ||
      Number(subject.totalMarks) > 0
  );

  return (
    <table className={`w-full ${lastIndex ? "rounded-b" : ""}`}>
      <thead className="sticky top-0 z-10">
        <tr className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
          <th className="px-2 py-2 text-left whitespace-nowrap">Subject code</th>
          <th className="px-2 py-2 text-left min-w-[10rem]">Subject name</th>
          {hasMarks && <th className="px-2 py-2 text-left">Internal</th>}
          {hasMarks && <th className="px-2 py-2 text-left">External</th>}
          {hasMarks && <th className="px-2 py-2 text-left">Total</th>}
          <th className="px-2 py-2 text-left">Grade</th>
          <th className="px-2 py-2 text-left">Credits</th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((subject, index) => (
          <tr key={`${subject.subjectCode}-${index}`}>
            <td className="px-2 py-2">{displayValue(subject.subjectCode)}</td>
            <td className="px-2 py-2 whitespace-normal break-words">
              {displayValue(subject.subjectName)}
            </td>
            {hasMarks && <td className="px-2 py-2">{markCell(subject.internalMarks)}</td>}
            {hasMarks && <td className="px-2 py-2">{markCell(subject.externalMarks)}</td>}
            {hasMarks && <td className="px-2 py-2">{markCell(subject.totalMarks)}</td>}
            <td className="px-2 py-2">{displayValue(subject.grades)}</td>
            <td className="px-2 py-2">{displayValue(subject.credits)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Subjects;

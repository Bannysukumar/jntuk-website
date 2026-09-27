import { displayValue } from "@/lib/jntuk-api";

const markCell = (value: unknown) => {
  if (value === null || value === undefined || value === "" || Number(value) === 0) {
    return "—";
  }
  return String(value);
};

const AcademicResult = ({ result, academic = false }: AcademicResultProps) => {
  const semesters = Array.isArray(result?.semesters) ? result.semesters : [];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        Only exams currently published by JNTUK (and previously saved for this hall ticket) are shown.
        Older semesters appear only if they were scraped while live.
      </p>
      {semesters.map((semester: Record<string, any>, index: number) => {
        const subjects = Array.isArray(semester.subjects) ? semester.subjects : [];
        const hasMarks = subjects.some(
          (subject: Record<string, any>) =>
            Number(subject.internalMarks) > 0 ||
            Number(subject.externalMarks) > 0 ||
            Number(subject.totalMarks) > 0
        );

        return (
          <div key={`${semester.semester || "sem"}-${index}`} className="result-table-wrap">
            <table className="w-full rounded-t">
              <tbody>
                <tr>
                  <th className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954] px-2 py-2 text-left">
                    {semester.semester || "Semester"} results
                  </th>
                </tr>
              </tbody>
            </table>
            <table className="w-full">
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
                {subjects.map((subject: Record<string, any>, subjectIndex: number) => (
                  <tr key={`${subject.subjectCode || "sub"}-${subjectIndex}`}>
                    <td className="px-2 py-2 whitespace-nowrap">{displayValue(subject.subjectCode)}</td>
                    <td className="px-2 py-2 whitespace-normal break-words">
                      {displayValue(subject.subjectName)}
                    </td>
                    {hasMarks && <td className="px-2 py-2">{markCell(subject.internalMarks)}</td>}
                    {hasMarks && <td className="px-2 py-2">{markCell(subject.externalMarks)}</td>}
                    {hasMarks && <td className="px-2 py-2">{markCell(subject.totalMarks)}</td>}
                    <td className="px-2 py-2">{displayValue(subject.grades || subject.grade)}</td>
                    <td className="px-2 py-2">{displayValue(subject.credits)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {academic && (
              <table className="w-full rounded-b">
                <tbody>
                  <tr>
                    <th className="w-[75%] px-2 py-2 text-left">SGPA</th>
                    <td className="w-[25%] px-2 py-2">
                      {displayValue(semester.semesterSGPA)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AcademicResult;

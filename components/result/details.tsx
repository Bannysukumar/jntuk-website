import { displayStudentName, displayValue } from "@/lib/jntuk-api";

interface ResultDetailsProps {
  details: Record<string, any>;
}

const ResultDetails = ({ details }: ResultDetailsProps) => {
  const name = displayStudentName(details?.name, details?.rollNumber);
  const fatherName = displayValue(details?.fatherName);
  const showFather = fatherName !== "—";

  return (
    <div className="result-table-wrap">
      <table className="w-full mt-2 rounded-t">
        <thead>
          <tr className="bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
            <th className="px-2 py-2 text-left">Hall ticket</th>
            <th className="px-2 py-2 text-left">College code</th>
            {showFather && <th className="px-2 py-2 text-left">Father name</th>}
            <th className="px-2 py-2 text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-2">{displayValue(details?.rollNumber)}</td>
            <td className="px-2 py-2">{displayValue(details?.collegeCode)}</td>
            {showFather && <td className="px-2 py-2">{fatherName}</td>}
            <td className="px-2 py-2">{name}</td>
          </tr>
        </tbody>
      </table>

      <table className="w-full mb-2 rounded-b">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
              College name
            </th>
            <th className="px-2 py-2 text-left bg-gray-200 md:bg-gray-300 dark:bg-[#0b3954]">
              Branch
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-2 whitespace-normal break-words">
              {displayValue(details?.collegeName)}
            </td>
            <td className="px-2 py-2 whitespace-normal break-words">
              {displayValue(details?.branch)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultDetails;

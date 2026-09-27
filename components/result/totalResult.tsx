import { displayValue } from "@/lib/jntuk-api";

const TotalResult = ({
  CGPA,
  backlogs,
  credits,
  serverStatus,
}: {
  CGPA?: unknown;
  backlogs?: unknown;
  credits?: unknown;
  serverStatus?: unknown;
}) => {
  return (
    <div className="result-table-wrap mt-2">
      <table className="rounded">
        <tbody>
          <tr>
            <th className="dark:bg-[#0b3954] w-[25%] bg-gray-200 px-2 py-2">
              Backlogs
            </th>
            <td className="w-[25%] px-2 py-2">{displayValue(backlogs, "0")}</td>
            <th className="dark:bg-[#0b3954] w-[25%] bg-gray-200 px-2 py-2">
              CGPA
            </th>
            <td className="w-[25%] px-2 py-2">{displayValue(CGPA)}</td>
          </tr>
          {(credits !== undefined || serverStatus !== undefined) && (
            <tr>
              <th className="dark:bg-[#0b3954] w-[25%] bg-gray-200 px-2 py-2">
                Credits
              </th>
              <td className="w-[25%] px-2 py-2">{displayValue(credits)}</td>
              <th className="dark:bg-[#0b3954] w-[25%] bg-gray-200 px-2 py-2">
                Server status
              </th>
              <td className="w-[25%] px-2 py-2">{displayValue(serverStatus)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TotalResult;

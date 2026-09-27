import { Loader2 } from "lucide-react";
import { QUEUED_RESULT_MESSAGE } from "@/lib/jntuk-api";

const QueuedState = ({
  title = "Fetching from JNTUK…",
  message = QUEUED_RESULT_MESSAGE,
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <div className="max-w-xl mx-auto my-10 px-4">
      <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 p-6 md:p-8 text-center">
        <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};

export default QueuedState;

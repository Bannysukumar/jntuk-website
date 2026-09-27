const FAIL_GRADES = new Set(["F", "AB", "ABSENT", "-", "MP"]);

export const UNPUBLISHED = "—";

export function unpublishedPersonField(
  value: unknown,
  rollNumber?: string
): string {
  const text = String(value ?? "").trim();
  if (!text) return UNPUBLISHED;
  if (rollNumber && text.toUpperCase() === String(rollNumber).toUpperCase()) {
    return UNPUBLISHED;
  }
  return text;
}

export function collegeLabel(details: Record<string, any>): string {
  const fromApi = String(details?.collegeName ?? "").trim();
  if (fromApi) return fromApi;
  return UNPUBLISHED;
}

export function branchLabel(details: Record<string, any>): string {
  const fromApi = String(details?.branch ?? "").trim();
  if (fromApi) return fromApi;
  return UNPUBLISHED;
}

export function unpublishedMark(value: unknown): string {
  if (value == null || value === "") return UNPUBLISHED;
  const numeric = Number(value);
  if (Number.isFinite(numeric) && numeric === 0) return UNPUBLISHED;
  const text = String(value).trim();
  if (!text || text === "-" || text.toLowerCase() === "null") return UNPUBLISHED;
  return text;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function officialResultUrl(examCode: string): string {
  const id = String(examCode || "").trim();
  if (UUID_RE.test(id)) {
    return `https://jntukresults.edu.in/results?resultId=${id}`;
  }
  return "https://jntukresults.edu.in";
}

function failScore(exam: Exam): number {
  return (exam.subjects || []).filter((subject) => {
    const grade = String(subject.grades ?? "").toUpperCase();
    const credits = Number(subject.credits);
    return FAIL_GRADES.has(grade) || credits === 0;
  }).length;
}

function titleHint(exam: Exam): string {
  const raw = [
    (exam as any).examType,
    (exam as any).type,
    (exam as any).title,
    (exam as any).notificationTitle,
    (exam as any).examTitle,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  if (!raw) return "";
  if (raw.includes("rcrv") || raw.includes("rc/rv") || raw.includes("reval")) {
    return "RCRV";
  }
  if (raw.includes("supply") || raw.includes("suppl")) return "Supplementary";
  if (raw.includes("regular")) return "Regular";
  return "";
}

export function examAttemptLabel(exam: Exam, siblings: Exam[]): string {
  if (exam.rcrv) return "RCRV";
  if (exam.graceMarks) return "Grace Marks";

  const fromTitle = titleHint(exam);
  if (fromTitle) return fromTitle;

  if (!siblings || siblings.length <= 1) return "Regular";

  const counts = siblings.map((item) => item.subjects?.length ?? 0);
  const max = Math.max(...counts);
  const mine = exam.subjects?.length ?? 0;
  if (mine < max) return "Supplementary";

  const largest = siblings.filter((item) => (item.subjects?.length ?? 0) === max);
  if (largest.length === 1) return "Regular";

  const myFails = failScore(exam);
  const otherFails = Math.max(
    ...largest.filter((item) => item !== exam).map(failScore),
    0
  );
  if (myFails > otherFails) return "Regular";
  return "Supplementary";
}

export interface Feedback {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: "new" | "read" | "resolved";
  createdAt?: Date;
  updatedAt?: Date;
}

export async function submitFeedback(
  _feedback: Omit<Feedback, "id" | "status" | "createdAt" | "updatedAt">
) {
  return;
}

export async function getFeedback(): Promise<Feedback[]> {
  return [];
}

export async function updateFeedbackStatus(
  _id: string,
  _status: "new" | "read" | "resolved"
) {
  return;
}

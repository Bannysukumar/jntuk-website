/**
 * Upstream JNTUK results API.
 * Requires X-Api-Key on every /api/* call except /api/health.
 */
const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const SERVER_API_URL = process.env.JNTUK_API_ORIGIN?.replace(/\/$/, "");

export const JNTUK_API_ORIGIN =
  PUBLIC_API_URL || SERVER_API_URL || "http://185.216.203.209:8088";

export const JNTUK_API_BASE_URL =
  process.env.JNTUK_API_BASE_URL?.replace(/\/$/, "") || `${JNTUK_API_ORIGIN}/api`;

export const JNTUK_API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ||
  process.env.JNTUK_API_KEY ||
  process.env.NEXT_PUBLIC_JNTUK_API_KEY ||
  "change-this-api-key";

export const JNTUK_API_KEY_HEADER = "X-Api-Key";

export const ROLL_NUMBER_LENGTH = 10;
export const ROLL_NUMBER_PATTERN = /^[A-Z0-9]{10}$/;

export const QUEUED_RESULT_MESSAGE =
  "Your results are being fetched from JNTUK. This can take 1–10 minutes if the university portal is busy. Keep this page open.";

export function normalizeRollNumber(value: string): string {
  return (value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, ROLL_NUMBER_LENGTH);
}

export function isValidRollNumber(value: string): boolean {
  return ROLL_NUMBER_PATTERN.test(normalizeRollNumber(value));
}

export function getJntukApiHeaders(includeKey = true): Record<string, string> {
  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0",
    Accept: "application/json",
  };
  if (includeKey && JNTUK_API_KEY) {
    headers[JNTUK_API_KEY_HEADER] = JNTUK_API_KEY;
  }
  return headers;
}

export function buildJntukApiUrl(path: string, params?: Record<string, string>): string {
  const base = JNTUK_API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(`${base}/${normalizedPath}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.set(key, value);
    });
  }
  return url.toString();
}

export function displayValue(value: unknown, fallback = "—"): string {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  if (!text || text === "0" || text.toLowerCase() === "null") return fallback;
  return text;
}

export function displayStudentName(name?: string, rollNumber?: string): string {
  const safeName = (name || "").trim();
  const safeRoll = (rollNumber || "").trim().toUpperCase();
  if (!safeName || safeName.toUpperCase() === safeRoll) return "—";
  return safeName;
}

/** @deprecated Use getJntukApiHeaders */
export const getJntuhApiHeaders = getJntukApiHeaders;

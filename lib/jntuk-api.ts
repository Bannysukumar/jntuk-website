/**
 * Upstream JNTUK results API.
 * Requires X-Api-Key on every /api/* call except /api/health.
 */
export const JNTUK_API_ORIGIN =
  process.env.JNTUK_API_ORIGIN?.replace(/\/$/, "") ||
  "http://185.216.203.209:8088";

export const JNTUK_API_BASE_URL =
  process.env.JNTUK_API_BASE_URL?.replace(/\/$/, "") ||
  `${JNTUK_API_ORIGIN}/api`;

export const JNTUK_API_KEY =
  process.env.JNTUK_API_KEY ||
  process.env.NEXT_PUBLIC_JNTUK_API_KEY ||
  "change-this-api-key";

export const JNTUK_API_KEY_HEADER = "X-Api-Key";

export const ROLL_NUMBER_LENGTH = 10;
export const ROLL_NUMBER_PATTERN = /^[A-Z0-9]{10}$/;

export function normalizeRollNumber(value: string): string {
  return (value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, ROLL_NUMBER_LENGTH);
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

/** @deprecated Use getJntukApiHeaders */
export const getJntuhApiHeaders = getJntukApiHeaders;

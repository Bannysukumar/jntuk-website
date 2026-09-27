import axios from "axios";
import { saveToLocalStorage } from "../customfunctions/localStorage";
import { isNative, nativeHttpGet } from "@/lib/native-features";
import {
  JNTUK_API_BASE_URL,
  QUEUED_RESULT_MESSAGE,
  getJntukApiHeaders,
  isValidRollNumber,
  normalizeRollNumber,
} from "@/lib/jntuk-api";

import toast from "react-hot-toast";

const UPSTREAM_API_BASE = JNTUK_API_BASE_URL.replace(/\/$/, "");
const NATIVE_API_OPTS = { headers: getJntukApiHeaders() };

const RESULT_CACHE_TTL_MS = 5 * 60 * 1000;
const RESULT_CACHE_KEY_PREFIX = "jntuk_result_";
const REQUEST_TIMEOUT_MS = 20 * 1000;
const POLL_DELAY_MS = 40 * 1000;
const MAX_POLLS = 15;

const resultMemoryCache = new Map<
  string,
  { data: AcademicResulProps; expiry: number }
>();
const inFlightRequests = new Map<string, Promise<null | AcademicResulProps>>();

function sleep(ms: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(Object.assign(new Error("Aborted"), { name: "AbortError" }));
      return;
    }
    const timer = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(Object.assign(new Error("Aborted"), { name: "AbortError" }));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function toastForStatus(status: number, data?: any): void {
  const message = data?.message || data?.error || data?.detail;
  switch (status) {
    case 403:
      toast.error(message || "Missing or invalid API key.");
      break;
    case 423:
      toast.error(message || "Class scrape refused. Queue is busy. Try again later.");
      break;
    case 424:
      toast.error(message || "JNTUK portal is down. Try again later.");
      break;
    case 409:
      toast.error(message || "This roll number is already in the queue.");
      break;
    case 502:
      toast.error(message || "JNTUK portal is down. Try again later.");
      break;
    case 503:
      toast.error(message || "Server overloaded. Please try again later.");
      break;
    case 500:
      toast.error(message || "Unexpected server error occurred.");
      break;
    default:
      toast.error(message || "Unhandled response from server.");
  }
}

async function requestUpstream(
  endpoint: string,
  params: Record<string, string>,
  signal?: AbortSignal | null
): Promise<{ status: number; data: any }> {
  const query = new URLSearchParams(params).toString();
  const url = isNative()
    ? `${UPSTREAM_API_BASE}/${endpoint}?${query}`
    : `/api/proxy?endpoint=${endpoint}&${query}`;

  if (isNative()) {
    const response = await nativeHttpGet(url, {
      timeout: REQUEST_TIMEOUT_MS,
      ...NATIVE_API_OPTS,
    });
    return {
      status: response.status ?? 200,
      data: response.data ?? response,
    };
  }

  const response = await axios.get(url, {
    timeout: REQUEST_TIMEOUT_MS,
    validateStatus: () => true,
    signal: signal ?? undefined,
  });
  return {
    status: response.status ?? 200,
    data: response.data ?? response,
  };
}

export type FetchOptions = {
  signal?: AbortSignal | null;
  skipCache?: boolean;
  onQueued?: (polls: number) => void;
};

async function requestWithPoll(
  endpoint: string,
  params: Record<string, string>,
  signal?: AbortSignal | null,
  polls = 0,
  onQueued?: (polls: number) => void
): Promise<{ status: number; data: any }> {
  const response = await requestUpstream(endpoint, params, signal);
  if (response.status === 202 && polls < MAX_POLLS) {
    onQueued?.(polls + 1);
    toast.dismiss();
    toast(QUEUED_RESULT_MESSAGE, { duration: 8000 });
    await sleep(POLL_DELAY_MS, signal);
    return requestWithPoll(endpoint, params, signal, polls + 1, onQueued);
  }
  return response;
}

function getCachedResult(htno: string): AcademicResulProps | null {
  const key = normalizeRollNumber(htno);
  const cached = resultMemoryCache.get(key);
  if (cached && cached.expiry > Date.now()) return cached.data;
  if (typeof sessionStorage !== "undefined") {
    try {
      const raw = sessionStorage.getItem(RESULT_CACHE_KEY_PREFIX + key);
      if (raw) {
        const { data, expiry } = JSON.parse(raw);
        if (expiry > Date.now() && data && "details" in data) {
          return data as AcademicResulProps;
        }
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function setCachedResult(htno: string, data: AcademicResulProps): void {
  const key = normalizeRollNumber(htno);
  const expiry = Date.now() + RESULT_CACHE_TTL_MS;
  resultMemoryCache.set(key, { data, expiry });
  if (typeof sessionStorage !== "undefined") {
    try {
      sessionStorage.setItem(
        RESULT_CACHE_KEY_PREFIX + key,
        JSON.stringify({ data, expiry })
      );
    } catch {
      // ignore
    }
  }
}

export function clearCachedResult(htno: string): void {
  const key = normalizeRollNumber(htno);
  resultMemoryCache.delete(key);
  inFlightRequests.delete(key);
  if (typeof sessionStorage !== "undefined") {
    try {
      sessionStorage.removeItem(RESULT_CACHE_KEY_PREFIX + key);
    } catch {
      // ignore
    }
  }
}

export const fetchAcademicResult = async (
  htno: string,
  options?: FetchOptions
): Promise<null | AcademicResulProps> => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return null;

  if (!options?.skipCache) {
    const cached = getCachedResult(key);
    if (cached) {
      toast.success("Result loaded from cache");
      return cached;
    }
  }

  let promise = inFlightRequests.get(key);
  if (promise) return promise;

  const signal = options?.signal;
  promise = (async (): Promise<null | AcademicResulProps> => {
    try {
      toast.loading("Fetching result...");

      const response = await requestWithPoll(
        "getAcademicResult",
        { rollNumber: key },
        signal,
        0,
        options?.onQueued
      );

      if (response.status === 200 && response.data && "details" in response.data) {
        toast.dismiss();
        toast.success("Result fetched successfully");
        setCachedResult(key, response.data as AcademicResulProps);
        return response.data as AcademicResulProps;
      }

      toast.dismiss();
      if (response.status === 202) {
        options?.onQueued?.(MAX_POLLS);
        toast(QUEUED_RESULT_MESSAGE, { duration: 8000 });
        return null;
      }
      toastForStatus(response.status, response.data);
      return null;
    } catch (e: any) {
      toast.dismiss();
      const isAbort = e?.name === "AbortError" || e?.code === "ERR_CANCELED";
      if (isAbort) throw e;

      const isAxiosError = axios.isAxiosError ? axios.isAxiosError(e) : false;
      const isTimeoutError =
        e.code === "ECONNABORTED" || e.message?.includes("timeout");

      if (isTimeoutError) {
        toast.error("Request timed out. Try again later.");
      } else if (isAxiosError && e.response) {
        toastForStatus(e.response.status, e.response.data);
      } else if (e.status) {
        toast.error(`Server error: ${e.status}`);
      } else {
        toast.error("Network issue. Please check your connection.");
      }

      return null;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, promise);
  return promise;
};

export const fetchHardRefresh = async (
  htno: string,
  options?: FetchOptions
): Promise<null | AcademicResulProps> => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return null;

  clearCachedResult(key);

  try {
    toast.loading("Forcing a fresh scrape...");
    const refresh = await requestUpstream(
      "hardRefresh",
      { rollNumber: key },
      options?.signal
    );

    if (refresh.status === 403 || refresh.status === 423 || refresh.status === 424) {
      toast.dismiss();
      toastForStatus(refresh.status, refresh.data);
      return null;
    }

    toast.dismiss();
    toast("Fresh scrape started. Checking academic result...");
    return fetchAcademicResult(key, {
      signal: options?.signal,
      skipCache: true,
      onQueued: options?.onQueued,
    });
  } catch (e: any) {
    toast.dismiss();
    if (e?.name === "AbortError" || e?.code === "ERR_CANCELED") throw e;
    toast.error("Could not refresh result. Try again later.");
    return null;
  }
};

export const fetchAllResult = async (
  htno: string,
  options?: FetchOptions
) => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return false;

  try {
    toast.loading("Fetching result...");
    const response = await requestWithPoll(
      "getAllResult",
      { rollNumber: key },
      options?.signal,
      0,
      options?.onQueued
    );

    if (response.status === 200 && response.data && "details" in response.data) {
      saveToLocalStorage(key + "-AllResult", JSON.stringify(response.data));
      toast.dismiss();
      toast.success("Result fetched successfully");
      return true;
    }

    toast.dismiss();
    if (response.status === 202) {
      toast(
        response.data?.message ||
          "Result is still being prepared. Please try again shortly."
      );
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (e: any) {
    toast.dismiss();
    if (e?.name === "AbortError" || e?.code === "ERR_CANCELED") throw e;
    const isAxiosError = axios.isAxiosError ? axios.isAxiosError(e) : false;
    const isTimeoutError =
      e.code === "ECONNABORTED" || e.message?.includes("timeout");
    if (isTimeoutError) toast.error("Request timed out. Try again later.");
    else if (isAxiosError && e.response) toastForStatus(e.response.status, e.response.data);
    else if (e.status) toast.error(`Server error: ${e.status}`);
    else toast.error("Network issue. Please check your connection.");
    return false;
  }
};

export const fetchBacklogReport = async (
  htno: string,
  options?: FetchOptions
) => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return false;

  try {
    toast.loading("Fetching backlogs...");
    const response = await requestWithPoll(
      "getBacklogs",
      { rollNumber: key },
      options?.signal,
      0,
      options?.onQueued
    );

    if (response.status === 200 && response.data && "details" in response.data) {
      saveToLocalStorage(key + "-Backlogreport", JSON.stringify(response.data));
      toast.dismiss();
      toast.success("Backlogs fetched successfully");
      return true;
    }

    toast.dismiss();
    if (response.status === 202) {
      toast(
        response.data?.message ||
          "Result is still being prepared. Please try again shortly."
      );
      return false;
    }
    if (response.data?.status === "success") {
      toast(response.data.message);
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (e: any) {
    toast.dismiss();
    if (e?.name === "AbortError" || e?.code === "ERR_CANCELED") throw e;
    toast.error("SERVER ISSUE!!");
    return false;
  }
};

export const fetchCreditsCheckerReport = async (
  htno: string,
  options?: FetchOptions
) => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return false;

  try {
    toast.loading("Fetching credits...");
    const response = await requestWithPoll(
      "getCreditsChecker",
      { rollNumber: key },
      options?.signal,
      0,
      options?.onQueued
    );

    if (response.status === 200 && response.data && "details" in response.data) {
      saveToLocalStorage(
        key + "-CreditsCheckerreport",
        JSON.stringify(response.data)
      );
      toast.dismiss();
      toast.success("Credits fetched successfully");
      return true;
    }

    toast.dismiss();
    if (response.status === 202) {
      toast(
        response.data?.message ||
          "Result is still being prepared. Please try again shortly."
      );
      return false;
    }
    if (response.data?.status === "success") {
      toast(response.data.message);
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (e: any) {
    toast.dismiss();
    if (e?.name === "AbortError" || e?.code === "ERR_CANCELED") throw e;
    toast.error("SERVER ISSUE!!");
    return false;
  }
};

export const fetchCreditContrastReport = async (
  htno1: string,
  htno2: string,
  options?: FetchOptions
) => {
  const key1 = normalizeRollNumber(htno1);
  const key2 = normalizeRollNumber(htno2);
  if (!isValidRollNumber(key1) || !isValidRollNumber(key2)) return false;

  try {
    toast.loading("Comparing results...");
    const response = await requestWithPoll(
      "getResultContrast",
      { rollNumber1: key1, rollNumber2: key2 },
      options?.signal,
      0,
      options?.onQueued
    );

    if (response.status === 200 && response.data && "studentProfiles" in response.data) {
      saveToLocalStorage(
        key1 + "-" + key2 + "-CreditContrastreport",
        JSON.stringify(response.data)
      );
      toast.dismiss();
      toast.success("Comparison fetched successfully");
      return true;
    }

    toast.dismiss();
    if (response.status === 202) {
      toast(
        "Waiting until both hall tickets have results. A 202 means one or both are still being fetched from JNTUK."
      );
      return false;
    }
    if (response.data?.status === "success") {
      toast(response.data.message);
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (error: any) {
    toast.dismiss();
    if (error?.name === "AbortError" || error?.code === "ERR_CANCELED") throw error;
    if (error?.response?.status === 400) {
      toast.error(error.response.data.detail);
    } else {
      toast.error("SERVER ISSUE!!");
    }
    return false;
  }
};

const NOTIFICATIONS_CACHE_TTL_MS = 2 * 60 * 1000;
const notificationsCache = new Map<string, { data: Result[] | null; expiry: number }>();
let latestNotificationsCache: { data: Result[] | null; expiry: number } | null = null;

function getNotificationsCacheKey(params: Params): string {
  return `notif_${params.page}_${params.degree}_${params.regulation}_${params.title}_${params.year}`;
}

export const fetchNotifications = async (params: Params): Promise<Result[] | null> => {
  const key = getNotificationsCacheKey(params);
  const cached = notificationsCache.get(key);
  if (cached && cached.expiry > Date.now()) return cached.data;

  try {
    const query: Record<string, string> = {
      page: String(params.page ?? "1"),
      category: "all",
    };
    if (params.degree) query.degree = String(params.degree);
    if (params.regulation) query.regulation = String(params.regulation);
    if (params.title) query.title = String(params.title);
    if (params.year) query.year = String(params.year);

    const response = await requestUpstream("notifications", query);

    if (response.status === 200) {
      if (response.data?.status === "success") return null;
      const data = response.data;
      const results = Array.isArray(data) ? data : data?.results ?? null;
      notificationsCache.set(key, {
        data: results,
        expiry: Date.now() + NOTIFICATIONS_CACHE_TTL_MS,
      });
      return results;
    }
    return null;
  } catch (error) {
    console.error("An error occurred while fetching notifications:", error);
    return null;
  }
};

export const fetchClassResult = async (
  htno: string,
  type: string = "academicresult",
  options?: FetchOptions
) => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return false;

  try {
    toast.loading("Fetching class results...");
    const response = await requestWithPoll(
      "getClassResults",
      { rollNumber: key, type },
      options?.signal,
      0,
      options?.onQueued
    );

    if (response.status === 200 && response.data && response.data.length > 0) {
      saveToLocalStorage(
        key + "-ClassResult-" + type,
        JSON.stringify(response.data)
      );
      toast.dismiss();
      toast.success("Class results fetched successfully");
      return true;
    }

    toast.dismiss();
    if (response.status === 202) {
      toast(
        response.data?.message ||
          "Class results are queued. Please try again shortly."
      );
      return false;
    }
    if (response.data?.status === "success") {
      toast(response.data.message);
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (e: any) {
    toast.dismiss();
    if (e?.name === "AbortError" || e?.code === "ERR_CANCELED") throw e;
    toast.error("SERVER ISSUE!!");
    return false;
  }
};

export const fetchGraceMarksEligibility = async (
  htno: string,
  options?: { signal?: AbortSignal | null }
) => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return false;

  try {
    toast.loading("Checking grace marks eligibility...");
    const url = isNative()
      ? `${UPSTREAM_API_BASE}/grace-marks/eligibility?rollNumber=${key}`
      : `/api/grace-marks/eligibility?rollNumber=${key}`;

    const response = isNative()
      ? await nativeHttpGet(url, { timeout: REQUEST_TIMEOUT_MS, ...NATIVE_API_OPTS })
      : await axios.get(url, {
          timeout: REQUEST_TIMEOUT_MS,
          validateStatus: () => true,
          signal: options?.signal ?? undefined,
        });

    if (response.status === 200 && response.data && ("eligibility" in response.data || "details" in response.data)) {
      saveToLocalStorage(key + "-GraceMarksEligibility", JSON.stringify(response.data));
      toast.dismiss();
      toast.success("Eligibility checked successfully");
      return true;
    }

    toast.dismiss();
    if (response.status === 404 || response.status === 406) {
      const message =
        response.status === 404
          ? "This hall ticket has no stored 4-2 result, so grace marks cannot be checked yet."
          : "Grace marks are not applicable for this record, or the checker is not configured.";
      saveToLocalStorage(
        key + "-GraceMarksEligibility",
        JSON.stringify({ _errorStatus: response.status, message })
      );
      toast(message, { duration: 8000 });
      return true;
    }
    if (response.data?.status === "success") {
      toast(response.data.message);
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (error: any) {
    toast.dismiss();
    if (error?.name === "AbortError" || error?.code === "ERR_CANCELED") throw error;
    if (error?.response?.status === 400) {
      toast.error(error.response.data.detail || error.response.data.error);
    } else {
      toast.error("Could not check grace marks. Try again later.");
    }
    return false;
  }
};

export const fetchGraceMarksProof = async (
  htno: string,
  options?: { signal?: AbortSignal | null }
) => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return false;

  try {
    toast.loading("Fetching grace marks proof...");
    const url = isNative()
      ? `${UPSTREAM_API_BASE}/grace-marks/proof?rollNumber=${key}`
      : `/api/grace-marks/proof?rollNumber=${key}`;

    const response = isNative()
      ? await nativeHttpGet(url, { timeout: REQUEST_TIMEOUT_MS, ...NATIVE_API_OPTS })
      : await axios.get(url, {
          timeout: REQUEST_TIMEOUT_MS,
          validateStatus: () => true,
          signal: options?.signal ?? undefined,
        });

    if (response.status === 200 && response.data && ("proof" in response.data || "details" in response.data)) {
      saveToLocalStorage(key + "-GraceMarksProof", JSON.stringify(response.data));
      toast.dismiss();
      toast.success("Proof fetched successfully");
      return true;
    }

    toast.dismiss();
    if (response.data?.status === "success") {
      toast(response.data.message);
      return false;
    }
    toastForStatus(response.status, response.data);
    return false;
  } catch (error: any) {
    toast.dismiss();
    if (error?.name === "AbortError" || error?.code === "ERR_CANCELED") throw error;
    if (error?.response?.status === 400) {
      toast.error(error.response.data.detail || error.response.data.error);
    } else {
      toast.error("SERVER ISSUE!!");
    }
    return false;
  }
};

export const fetchLatestNotifications = async (): Promise<Result[] | null> => {
  if (latestNotificationsCache && latestNotificationsCache.expiry > Date.now()) {
    return latestNotificationsCache.data;
  }
  try {
    const response = await requestUpstream("getlatestnotifications", {});

    if (response.status === 200) {
      if (response.data?.status === "failure") {
        return [];
      }
      let data: Result[] | null = null;
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data?.notifications && Array.isArray(response.data.notifications)) {
        data = response.data.notifications;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (response.data?.results && Array.isArray(response.data.results)) {
        data = response.data.results;
      }
      latestNotificationsCache = {
        data,
        expiry: Date.now() + NOTIFICATIONS_CACHE_TTL_MS,
      };
      return data;
    }
    return null;
  } catch (error: any) {
    if (error.response?.status >= 500 || !error.response) {
      console.error("An error occurred while fetching latest notifications:", error);
    }
    return null;
  }
};

function unwrapList(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.jobs)) return data.jobs;
  if (Array.isArray(data?.calendars)) return data.calendars;
  if (Array.isArray(data?.syllabus)) return data.syllabus;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  if (data && typeof data === "object" && Object.keys(data).length > 0) return [data];
  return [];
}

export const fetchJobs = async (): Promise<any[]> => {
  const response = await requestUpstream("jobs", {});
  if (response.status !== 200) return [];
  return unwrapList(response.data);
};

export const fetchCalendars = async (): Promise<any[]> => {
  const response = await requestUpstream("calendars", {});
  if (response.status !== 200) return [];
  return unwrapList(response.data);
};

export const fetchSyllabus = async (): Promise<any[]> => {
  const response = await requestUpstream("syllabus", {});
  if (response.status !== 200) return [];
  return unwrapList(response.data);
};

export const fetchCmmPdf = async (htno: string): Promise<Blob | null> => {
  const key = normalizeRollNumber(htno);
  if (!isValidRollNumber(key)) return null;
  try {
    const url = isNative()
      ? `${UPSTREAM_API_BASE}/getCMM?rollNumber=${key}`
      : `/api/proxy?endpoint=getCMM&rollNumber=${key}`;
    const response = await fetch(url, {
      headers: isNative() ? getJntukApiHeaders() : undefined,
    });
    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "";
    const blob = await response.blob();
    if (!blob || blob.size < 80) return null;
    if (contentType.includes("json") || blob.type.includes("json")) return null;
    return blob;
  } catch {
    return null;
  }
};

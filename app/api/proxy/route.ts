import { NextRequest, NextResponse } from "next/server";
import { JNTUK_API_BASE_URL, getJntukApiHeaders } from "@/lib/jntuk-api";

const EXTERNAL_API_BASE = JNTUK_API_BASE_URL;
const PROXY_CACHE_TTL_SEC = 120;
const NOTIFICATIONS_CACHE_TTL_SEC = 90;
const CACHEABLE_ENDPOINTS = [
  "getAcademicResult",
  "getAllResult",
  "getBacklogs",
  "getCreditsChecker",
  "notifications",
];

function getProxyCacheKey(endpoint: string, searchParams: URLSearchParams): string | null {
  if (endpoint === "notifications") {
    const page = searchParams.get("page") ?? "1";
    const degree = searchParams.get("degree") ?? "";
    const regulation = searchParams.get("regulation") ?? "";
    const title = searchParams.get("title") ?? "";
    const year = searchParams.get("year") ?? "";
    const category = searchParams.get("category") ?? "all";
    return `proxy:notifications:${page}:${category}:${degree}:${regulation}:${title}:${year}`;
  }
  if (!CACHEABLE_ENDPOINTS.includes(endpoint)) return null;
  const rollNumber = searchParams.get("rollNumber")?.trim().toUpperCase();
  if (!rollNumber || rollNumber.length < 10) return null;
  return `proxy:${endpoint}:${rollNumber}`;
}

async function getRedis(): Promise<import("ioredis").Redis | null> {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    const Redis = (await import("ioredis")).default;
    return new Redis(url);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json(
      { error: "Endpoint parameter is required" },
      { status: 400 }
    );
  }

  const cacheKey = getProxyCacheKey(endpoint, searchParams);
  if (cacheKey) {
    try {
      const redis = await getRedis();
      if (redis) {
        const cached = await redis.get(cacheKey);
        if (cached) {
          const data = JSON.parse(cached);
          return NextResponse.json(data, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
              "X-Proxy-Cache": "HIT",
            },
          });
        }
      }
    } catch {
      // ignore cache errors, proceed to fetch
    }
  }

  const externalUrl = new URL(`${EXTERNAL_API_BASE}/${endpoint}`);
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      externalUrl.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(externalUrl.toString(), {
      method: "GET",
      headers: getJntukApiHeaders(endpoint !== "health"),
      next: { revalidate: 0 },
    });

    const contentType = response.headers.get("content-type") || "";
    if (endpoint === "getCMM") {
      const buffer = await response.arrayBuffer();
      return new NextResponse(buffer, {
        status: response.status,
        headers: {
          "Content-Type": contentType || "application/pdf",
          "Content-Disposition":
            response.headers.get("content-disposition") ||
            `attachment; filename="cmm-${searchParams.get("rollNumber") || "result"}.pdf"`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    let data: any;
    try {
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { error: text || `External API returned ${response.status}` };
        }
      }
    } catch {
      data = { error: `External API returned ${response.status}` };
    }

    if (
      cacheKey &&
      response.status === 200 &&
      data &&
      typeof data === "object"
    ) {
      const isResult = "details" in data;
      const isNotifications =
        endpoint === "notifications" &&
        (Array.isArray(data) || (data as any).results != null);
      if (isResult || isNotifications) {
        try {
          const redis = await getRedis();
          if (redis) {
            const ttl =
              endpoint === "notifications"
                ? NOTIFICATIONS_CACHE_TTL_SEC
                : PROXY_CACHE_TTL_SEC;
            await redis.set(cacheKey, JSON.stringify(data), "EX", ttl);
          }
        } catch {
          // ignore
        }
      }
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
      },
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from external API", message: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
    },
  });
}

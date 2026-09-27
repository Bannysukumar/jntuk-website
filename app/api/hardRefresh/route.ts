import { NextRequest, NextResponse } from "next/server";
import { JNTUK_API_BASE_URL, getJntukApiHeaders, normalizeRollNumber } from "@/lib/jntuk-api";

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

async function clearLocalCache(rollNumber?: string) {
  const redis = await getRedis();
  if (!redis) return { deleted: 0 };

  if (rollNumber) {
    const keys = [
      rollNumber,
      `proxy:getAcademicResult:${rollNumber}`,
      `proxy:getAllResult:${rollNumber}`,
      `proxy:getBacklogs:${rollNumber}`,
      `proxy:getCreditsChecker:${rollNumber}`,
    ];
    const deleted = await redis.del(...keys);
    return { deleted };
  }

  const keys = await redis.keys("proxy:*");
  const tenCharKeys = (await redis.keys("*")).filter(
    (key) => key !== "notifications" && key.length === 10
  );
  const toDelete = Array.from(new Set([...keys, ...tenCharKeys]));
  if (toDelete.length === 0) return { deleted: 0 };
  const deleted = await redis.del(...toDelete);
  return { deleted };
}

async function callUpstreamHardRefresh(rollNumber: string) {
  const url = new URL(`${JNTUK_API_BASE_URL}/hardRefresh`);
  url.searchParams.set("rollNumber", rollNumber);
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: getJntukApiHeaders(),
    cache: "no-store",
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = { message: `Upstream returned ${response.status}` };
  }

  return { status: response.status, data };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("rollNumber") || searchParams.get("htno") || "";
  const rollNumber = normalizeRollNumber(raw);

  try {
    if (!rollNumber) {
      return NextResponse.json(
        { success: false, error: "rollNumber is required" },
        { status: 400 }
      );
    }

    const local = await clearLocalCache(rollNumber);
    const upstream = await callUpstreamHardRefresh(rollNumber);

    return NextResponse.json(
      {
        success: upstream.status === 200 || upstream.status === 202,
        message:
          upstream.data?.message ||
          `Hard refresh started for ${rollNumber}. Poll academic result in 30–60s.`,
        deleted: local.deleted,
        rollNumber,
        upstream: upstream.data,
      },
      { status: upstream.status }
    );
  } catch (error: any) {
    console.error("Hard refresh error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to hard refresh",
        message: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { htno, rollNumber: bodyRoll, clearAll } = body;

    if (clearAll) {
      const local = await clearLocalCache();
      return NextResponse.json({
        success: true,
        message: `Cleared ${local.deleted} local cache entries`,
        deleted: local.deleted,
      });
    }

    const rollNumber = normalizeRollNumber(bodyRoll || htno || "");
    if (!rollNumber) {
      return NextResponse.json(
        {
          success: false,
          error: "Either 'rollNumber' or 'clearAll' parameter is required",
        },
        { status: 400 }
      );
    }

    const local = await clearLocalCache(rollNumber);
    const upstream = await callUpstreamHardRefresh(rollNumber);

    return NextResponse.json(
      {
        success: upstream.status === 200 || upstream.status === 202,
        message:
          upstream.data?.message ||
          `Hard refresh started for ${rollNumber}. Poll academic result in 30–60s.`,
        deleted: local.deleted,
        rollNumber,
        upstream: upstream.data,
      },
      { status: upstream.status }
    );
  } catch (error: any) {
    console.error("Hard refresh error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to hard refresh",
        message: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

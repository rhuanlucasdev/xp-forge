import { NextResponse } from "next/server";

const BASE_URL = "https://secure.runescape.com/m=hiscore/index_lite.ws";
const RATE_LIMIT = 10; // reqs
const WINDOW = 60 * 1000; // 1 min

const ipMap = new Map<string, { count: number; time: number }>();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  const now = Date.now();

  const record = ipMap.get(ip);

  if (record) {
    if (now - record.time < WINDOW) {
      if (record.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: "Too many requests" },
          { status: 429 },
        );
      }

      record.count++;
    } else {
      ipMap.set(ip, { count: 1, time: now });
    }
  } else {
    ipMap.set(ip, { count: 1, time: now });
  }

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `${BASE_URL}?player=${encodeURIComponent(username)}`,
      {
        // ⚡ CACHE (Next.js)
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch hiscore" },
        { status: res.status },
      );
    }

    const text = await res.text();

    return NextResponse.json({ raw: text });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${encodeURIComponent(username)}`,
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const text = await res.text();

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hiscore" },
      { status: 500 },
    );
  }
}

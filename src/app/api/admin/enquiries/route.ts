import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const messages = db
      .prepare(`SELECT * FROM messages ORDER BY created_at DESC`)
      .all();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

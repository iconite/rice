import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allMessages = await db.select().from(messages).orderBy(desc(messages.createdAt));

    return NextResponse.json(allMessages);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

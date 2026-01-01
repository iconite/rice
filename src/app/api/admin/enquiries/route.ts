import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { messages } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(messages).orderBy(desc(messages.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

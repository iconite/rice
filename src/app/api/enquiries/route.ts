import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, productType, quantity, destination, message } = body;

    // Validate required fields
    if (!name || !email || !productType || !quantity || !destination) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert message into database
    await db.insert(messages).values({
      name,
      email,
      productType,
      quantity,
      destination,
      message: message || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return NextResponse.json(
      { error: "Failed to save enquiry" },
      { status: 500 }
    );
  }
}

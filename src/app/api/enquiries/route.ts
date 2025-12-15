import { NextResponse } from "next/server";
import db from "@/lib/db";

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
    const stmt = db.prepare(`
      INSERT INTO messages (name, email, product_type, quantity, destination, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(name, email, productType, quantity, destination, message || null);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return NextResponse.json(
      { error: "Failed to save enquiry" },
      { status: 500 }
    );
  }
}

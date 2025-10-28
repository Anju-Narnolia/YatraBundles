import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Bundle from "@/models/Bundle";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  try {
    const { id } = await params;
    const bundle = await Bundle.findById(id);
    if (!bundle) {
      return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
    }
    return NextResponse.json({ bundle });
  } catch (error) {
    console.error("Error fetching bundle:", error);
    return NextResponse.json({ error: "Failed to fetch bundle" }, { status: 500 });
  }
}


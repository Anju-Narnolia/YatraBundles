import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/service";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Destination slug is required" },
        { status: 400 }
      );
    }

    // Fetch services where destinationSlug matches
    const services = await Service.find({ destinationSlug: slug });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

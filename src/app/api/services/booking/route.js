import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect"
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const newBooking = await Booking.create(body);

    return NextResponse.json({ success: true, insertedId: newBooking._id });
  } catch (error) {
    console.error("Error saving booking:", error);
    return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 });
  }
}

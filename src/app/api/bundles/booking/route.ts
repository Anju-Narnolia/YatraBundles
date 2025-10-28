import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import BundleBooking from "@/models/BundleBooking";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const bookingData = await req.json();
    
    const booking = new BundleBooking(bookingData);
    await booking.save();

    return NextResponse.json(
      { success: true, insertedId: booking._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}


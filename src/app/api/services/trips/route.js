import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import BundleBooking from "@/models/BundleBooking";

export async function GET() {
  try {
    await dbConnect();

    // const bookings = await Booking.find().sort({ createdAt: -1 }); 

    const SBookings = await Booking.find().sort({ createdAt: -1 }); 
    const BBooking = await BundleBooking.find().sort({createdAt: -1,});

    const bookings = [...SBookings , ...BBooking];

    console.log(bookings);

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Hotel from "@/models/Hotel";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const name = formData.get("name");
  const address = formData.get("address");
  const file = formData.get("photo"); // hotel image file

  // Upload photo to Cloudinary
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "hotels" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  // Save hotel info + photo URL in MongoDB
  const newHotel = await Hotel.create({
    name,
    address,
    photo: result.secure_url, // store Cloudinary URL
  });

  return NextResponse.json(newHotel);
}

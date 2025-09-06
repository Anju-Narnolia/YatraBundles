import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, password, role } = body;

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      role,
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else if (err instanceof mongoose.Error) {
      console.error("Mongoose error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      console.error("Unexpected error", err);
    }
  }
}

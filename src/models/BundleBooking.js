import mongoose from "mongoose";

const BundleBookingSchema = new mongoose.Schema({
  bundleId: { type: String, required: true },
  city: { type: String },
  price: { type: Number },
  img: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cardName: { type: String },
  cardNumber: { type: String },
  expiry: { type: String },
  cvv: { type: String },
  checkIn: { type: String },
  checkOut: { type: String },
  specialRequest: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BundleBooking ||
  mongoose.model("BundleBooking", BundleBookingSchema);


import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  serviceName: { type: String },
  price: { type: Number },
  destination: { type: String },
  sPhone: { type: String },
  img: { type: String },
  address: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  cardNumber: { type: String },
  expiry: { type: String },
  cvv: { type: String },
  createdAt: { type: Date, default: Date.now },
  checkIn: { type: String }, // corrected spelling
  checkOut: { type: String }, // corrected spelling
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);

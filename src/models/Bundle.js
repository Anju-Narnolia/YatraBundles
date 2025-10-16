import mongoose from "mongoose";

const BundleSchema = new mongoose.Schema({
  city: { type: String, required: true },
  image: { type: String, required: true }, // store path from /public or URL
  info: { type: String, required: true },
  alt: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bundle || mongoose.model("Bundle", BundleSchema);
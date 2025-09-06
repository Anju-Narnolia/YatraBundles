// models/Hotel.js
import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  destination: String,
  name: String,
  Gender: String,
  price: Number,
  vehicle: String,
  Date: Date,
  photo: String,
  available:Boolean
});

module.exports = mongoose.model("Driver", driverSchema);

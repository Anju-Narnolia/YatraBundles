// models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  destination: String,
  name: String,
  address: String,
  price: Number,
  Date: Date,
  photo: String, // URL of the uploaded photo
});

module.exports = mongoose.model("Hotel", hotelSchema);

import mongoose from "mongoose";
import User from "./user.js";

// Define a DiscountCode schema
const discountCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountType: { type: String },
  value: { type: Number },
  expirationDate: { type: Date },
  used: { type: Boolean, default: false },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema);

export default DiscountCode;

import mongoose from "mongoose";
// import DiscountCode from "./discountCode.js";
const user = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  discountCodes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DiscountCode" },
  ],
});

const User = mongoose.model("User", user);

export default User;

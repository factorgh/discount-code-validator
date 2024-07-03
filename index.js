import express from "express";
import cors from "cors";
import crypto from "crypto";
// import moment from "moment";
import dotenv from "dotenv";
import mongoose from "mongoose";

import discountRoute from "./routes/discountCode.route.js";
import userRoute from "./routes/user.route.js";
import morgan from "morgan";

dotenv.config({ path: "./.config.env" });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected successfully"));
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/discount", discountRoute);
app.use("/api/users", userRoute);
///Discount List
// let discountCodes = [];

// // Generate random codes
// function generateRandomCode(length) {
//   return crypto.randomBytes(length).toString("hex").substring(0, length);
// }

// // app.get("/generate", (req, res) => {
//   const code = generateRandomCode(10);
//   console.log(code);
//   const expirationDate = moment().add(2, "hours").toDate();
//   const discountCode = {
//     code,
//     discount_type: "percentage",
//     value: 12.0,
//     expiration_date: expirationDate,
//     used: false,
//   };
//   discountCodes.push(discountCode);
//   res.send(discountCode);
// });

// app.post("/apply", (req, res) => {
//   const { code, totalAmount } = req.body;
//   const discountCode = discountCodes.find((dc) => dc.code === code);

//   if (!discountCode) {
//     return res.status(404).json({ error: "Discount code not found." });
//   }

//   if (discountCode.used) {
//     return res
//       .status(400)
//       .json({ error: "Discount code has already been used." });
//   }

//   if (moment().isAfter(discountCode.expiration_date)) {
//     return res.status(400).json({ error: "Discount code has expired." });
//   }

//   const discountedAmount = totalAmount * (1 - discountCode.value / 100);
//   discountCode.used = true;
//   res.json({ discountedAmount });
// });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

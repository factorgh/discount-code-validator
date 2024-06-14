import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();

app.use(express.json());
app.use(cors());

///Discount List
let discountCodes = [];

// Generate random codes
function generateRandomCode(length) {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
}

app.post("api/v1/code/generate", (req, res) => {
  const code = generateRandomCode(10);
  const expirationDate = moment().add(24, "hours").toDate();
  const discountCode = {
    code,
    discount_type: "percentage",
    value: 12.0,
    expiration_date: expirationDate,
    used: false,
  };
  discountCodes.push(discountCode);
  res.json(discountCode);
});

app.post("api/v1/code/apply", (req, res) => {
  const { code, totalAmount } = req.body;
  const discountCode = discountCodes.find((dc) => dc.code === code);

  if (!discountCode) {
    return res.status(404).json({ error: "Discount code not found." });
  }

  if (discountCode.used) {
    return res
      .status(400)
      .json({ error: "Discount code has already been used." });
  }

  if (moment().isAfter(discountCode.expiration_date)) {
    return res.status(400).json({ error: "Discount code has expired." });
  }

  const discountedAmount = totalAmount * (1 - discountCode.value / 100);
  discountCode.used = true;
  res.json({ discountedAmount });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

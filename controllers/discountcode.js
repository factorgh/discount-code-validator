import DiscountCode from "../models/discountCode.js";
import User from "../models/user.js";
import crypto from "crypto";

//Generate random codes
function generateRandomCode(length) {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
}
/// Generate discount code
const generateDiscount = async (req, res) => {
  const { userId } = req.body;
  const code = generateRandomCode(10);
  const discountType = "percentage";
  const value = 20.0;
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);

  const discountCode = new DiscountCode({
    code,
    discountType,
    value,
    expirationDate,
    userId,
    used: false,
  });

  try {
    await discountCode.save();

    // Link discount code to the user
    await User.findByIdAndUpdate(userId, {
      $push: { discountCodes: discountCode._id },
    });

    res.status(200).send({ code });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating discount code");
  }
};

///Validate and apply discount
const applyDiscount = async (req, res) => {
  const { code, totalAmount } = req.body;

  try {
    const discountCode = await DiscountCode.findOne({ code });

    if (!discountCode) {
      return res.status(400).send("Invalid discount code");
    }

    const now = new Date();
    if (discountCode === "") return res.send({ totalAmount });

    if (discountCode.used || discountCode.expirationDate < now) {
      return res
        .status(400)
        .send("Discount code is either expired or already used");
    }

    const discountedAmount = totalAmount * (1 - discountCode.value / 100);

    discountCode.used = true;
    await discountCode.save();

    res.status(200).send({ discountedAmount });
  } catch (error) {
    res.status(500).send("Error applying discount code");
  }
};

// Endpoint to fetch discount codes for a user
const userDiscount = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("discountCodes");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user.discountCodes);
  } catch (error) {
    res.status(500).send("Error fetching discount codes");
  }
};

export default {
  userDiscount,
  generateDiscount,
  applyDiscount,
};

import express from "express";
import discountController from "../controllers/discountcode.js";

const router = express.Router();

router.post("/create-discount", discountController.generateDiscount);

router.post("/apply-discount", discountController.applyDiscount);

router.get("/user-discount-codes/:userId", discountController.userDiscount);

export default router;

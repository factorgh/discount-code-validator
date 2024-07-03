import express from "express";

import userController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);

export default router;

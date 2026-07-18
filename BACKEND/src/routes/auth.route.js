import express from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

const router = express.Router();

router.post("/register", wrapAsync(registerUser));
router.post("/login", wrapAsync(loginUser));

export default router;
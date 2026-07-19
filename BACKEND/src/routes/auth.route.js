import express from "express";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

const router = express.Router();

router.post("/register", wrapAsync(registerUser));
router.post("/login", wrapAsync(loginUser));
router.post("/logout", wrapAsync(logoutUser));
router.get("/me", authMiddleware, wrapAsync(getCurrentUser));

export default router;

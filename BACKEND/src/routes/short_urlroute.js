import express from "express";
import { createShortUrl, redirectToOriginalUrl, createCustomShortUrl, getUserShortUrls } from "../controller/short_urlController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", authMiddleware, createShortUrl);
router.post("/", authMiddleware, createCustomShortUrl);
router.get("/urls", authMiddleware, getUserShortUrls);
router.get("/:short_url", redirectToOriginalUrl);

export default router;
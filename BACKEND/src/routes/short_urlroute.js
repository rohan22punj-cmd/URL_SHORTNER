import express from "express";
import { createShortUrl, redirectToOriginalUrl, createCustomShortUrl } from "../controller/short_urlController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create", authMiddleware, createShortUrl);
router.get("/:short_url", redirectToOriginalUrl);
router.post("/", authMiddleware, createCustomShortUrl);


export default router;
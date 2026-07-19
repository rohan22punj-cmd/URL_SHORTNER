import express from "express";
import { createShortUrl, redirectToOriginalUrl, createCustomShortUrl } from "../controller/short_urlController.js";
const router = express.Router();

router.post("/create", createShortUrl);
router.get("/:short_url", redirectToOriginalUrl);
router.post("/", createCustomShortUrl);


export default router;
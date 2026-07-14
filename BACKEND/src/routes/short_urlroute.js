import express from "express";
import { createShortUrl, redirectToOriginalUrl } from "../controller/short_urlController.js";
const router = express.Router();

router.post("/create", createShortUrl);
router.get("/:short_url", redirectToOriginalUrl);
router.get("/:short_url", redirectToOriginalUrl);


export default router;
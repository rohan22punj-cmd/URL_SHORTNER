import { createShortUrlService, getOriginalUrlService } from "../services/short_urlService.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async(req, res) => {
    const { full_url } = req.body;
    const short_url = await createShortUrlService(full_url);
    res.json({ short_url: process.env.APP_URL + short_url });
});

export const redirectToOriginalUrl = wrapAsync(async(req, res) => {
    const { short_url } = req.params;
    const url = await getOriginalUrlService(short_url);
    res.redirect(url.full_url);
});
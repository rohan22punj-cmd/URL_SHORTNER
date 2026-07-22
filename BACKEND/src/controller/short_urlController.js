import { createShortUrlService, getOriginalUrlService } from "../services/short_urlService.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

const getFullShortUrl = (slug) => {
    const baseUrl = (process.env.APP_URL || "http://localhost:3000/").replace(/\/$/, "");
    return `${baseUrl}/${slug}`;
};

export const createShortUrl = wrapAsync(async(req, res) => {
    const { full_url } = req.body;
    const short_url = await createShortUrlService(full_url, req.user?._id);
    res.json({ short_url: getFullShortUrl(short_url) });
});

export const redirectToOriginalUrl = wrapAsync(async(req, res) => {
    const { short_url } = req.params;
    const url = await getOriginalUrlService(short_url);
    res.redirect(url.full_url);
});

export const createCustomShortUrl = wrapAsync(async(req, res) => {
    const { full_url, custom_short_url } = req.body;
    const short_url = await createShortUrlService(full_url, req.user?._id, custom_short_url);
    res.json({ short_url: getFullShortUrl(short_url) });
});
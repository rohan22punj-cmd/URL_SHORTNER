import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/shortUrlSchema.js";
import { saveShortUrl, getUserUrls } from "../dao/short_url.js";
import { BadRequestError, NotFoundError } from "../utils/errorHandler.js";

export const createShortUrlService = async(url, userId, customShortUrl = null) => {
    if (!url) {
        throw new BadRequestError("Full URL is required");
    }

    const short_url = customShortUrl || generateNanoid(7);
    await saveShortUrl(url, short_url, userId);
    return short_url;
};

export const getUserShortUrlsService = async(userId) => {
    if (!userId) {
        throw new BadRequestError("User must be authenticated to view history.");
    }

    return await getUserUrls(userId);
};

export const getOriginalUrlService = async(short_url) => {
    const url = await urlSchema.findOneAndUpdate({ short_url }, { $inc: { clicks: 1 } }, { new: true });

    if (!url) {
        throw new NotFoundError("Short URL not found");
    }

    return url;
};
import { createShortUrlService, getOriginalUrlService } from "../services/short_urlService.js";

export const createShortUrl = async(req, res) => {
    try {
        const { full_url } = req.body;
        const short_url = await createShortUrlService(full_url);
        res.send(process.env.APP_URL + short_url);
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// export const redirectToOriginalUrl = async(req, res) => {
//     try {
//         const { short_url } = req.params;
//         const url = await getOriginalUrlService(short_url);
//         if (!url) {
//             return res.status(404).json({ error: "URL not found" });
//         }
//         res.redirect(url.full_url);
//     } catch (error) {
//         console.error("Error fetching URL:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
export const redirectToOriginalUrl = async(req, res, next) => {
    try {
        const { short_url } = req.params;
        const url = await getOriginalUrlService(short_url);
        res.redirect(url.full_url);
    } catch (err) {
        next(err); // forward any error (including your AppError) to errorHandler
    }
};
import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const parseCookies = (req, res, next) => {
    const cookieHeader = req.headers.cookie;
    req.cookies = {};

    if (!cookieHeader) {
        return next();
    }

    cookieHeader.split(";").forEach((cookie) => {
        const [name, ...valueParts] = cookie.trim().split("=");
        if (!name) return;
        req.cookies[name] = decodeURIComponent(valueParts.join("="));
    });

    next();
};

export const attachUser = async(req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return next();
    }

    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        req.user = null;
        next();
    }
};

export const authMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    next();
};

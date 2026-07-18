import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/config.js";

export const generateNanoid = (length) => {
    return nanoid(length);
}

export const signToken = (payload, secret, options) => {
    return jwt.sign(payload, process.env.JWT_SECRET, cookieOptions);
}

export const verifyToken = (token, secret) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
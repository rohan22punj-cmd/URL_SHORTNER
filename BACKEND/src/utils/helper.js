import { nanoid } from "nanoid";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);

export const generateNanoid = (length) => {
    return nanoid(length);
}

export const signToken = (payload, options = {}) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
        ...options,
    });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const hashPassword = async(password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const derivedKey = await scrypt(password, salt, 64);

    return `${salt}:${derivedKey.toString("hex")}`;
}

export const comparePassword = async(password, storedPassword) => {
    const [salt, storedHash] = storedPassword.split(":");

    if (!salt || !storedHash) {
        return false;
    }

    const derivedKey = await scrypt(password, salt, 64);
    const storedKey = Buffer.from(storedHash, "hex");

    if (storedKey.length !== derivedKey.length) {
        return false;
    }

    return crypto.timingSafeEqual(storedKey, derivedKey);
}

import { clearCookieOptions, cookieOptions } from "../config/config.js";
import {
    loginUserService,
    registerUserService,
    sanitizeUser,
} from "../services/auth.service.js";

export const registerUser = async(req, res) => {
    const { user, token } = await registerUserService(req.body);

    res
        .cookie("token", token, cookieOptions)
        .status(201)
        .json({ message: "User registered successfully", user: sanitizeUser(user) });
};

export const loginUser = async(req, res) => {
    const { user, token } = await loginUserService(req.body);

    res
        .cookie("token", token, cookieOptions)
        .status(200)
        .json({ message: "User logged in successfully", user: sanitizeUser(user) });
};

export const logoutUser = async(req, res) => {
    res
        .clearCookie("token", clearCookieOptions)
        .status(200)
        .json({ message: "User logged out successfully" });
};

export const getCurrentUser = async(req, res) => {
    res.status(200).json({ user: sanitizeUser(req.user) });
};

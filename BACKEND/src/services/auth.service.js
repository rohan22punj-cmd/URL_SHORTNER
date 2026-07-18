import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { findUserByEmail, createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";

export const registerUser = wrapAsync(async(req, res) => {
    const { username, email, password } = req.body;
    const user = await createUser({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
});

export const loginUser = wrapAsync(async(req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email: email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
});
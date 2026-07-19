import wrapAsync from "../utils/tryCatchWrapper.js";
import { createUser, findUserByEmail } from "../services/auth.service.js";

export const registerUser = wrapAsync(async(req, res) => {
    // res.send("User registered successfully");
    const { username, email, password } = req.body;
    const user = await createUser({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
    res.cookie("token", token, cookieOptions);
});
export const loginUser = wrapAsync(async(req, res) => {
    // res.send("User logged in successfully");
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
});
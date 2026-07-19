import { verifyToken } from "../utils/jwt.js";
import { userById } from "../dao/user.dao.js";


export const attachUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    // Verify the token and attach the user to the request object
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};
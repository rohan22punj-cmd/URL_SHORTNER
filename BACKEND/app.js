import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongo.config.js";
import short_urlRoute from "./src/routes/short_urlroute.js";
import auth_routes from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser, parseCookies } from "./src/middleware/auth.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(parseCookies);
app.use(attachUser);

app.get('/', (req, res) => {
    res.send('URL Shortener API is running 🚀');
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// API routes - register auth_routes before short_urlRoute so /api/me is not caught by /:short_url
app.use("/api/auth", auth_routes);
app.use("/api", auth_routes);
app.use("/api", short_urlRoute);
app.use("/", short_urlRoute);

app.use(errorHandler);

await connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
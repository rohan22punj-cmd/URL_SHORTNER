import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import short_urlRoute from "./src/routes/short_urlroute.js";
import auth_routes from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
dotenv.config();
import cors from "cors";
import { attachUser, parseCookies } from "./src/middleware/auth.middleware.js";

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(parseCookies);
app.use(attachUser);

app.use("/api", short_urlRoute);
app.use("/", short_urlRoute);
app.use("/api", auth_routes);
app.use("/api/auth", auth_routes);
app.use(errorHandler);

await connectDB();

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import short_urlRoute from "./src/routes/short_urlroute.js";
import { errorHandler } from "./src/utils/errorHandler.js";
dotenv.config("./.env");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", short_urlRoute);
app.use("/", short_urlRoute);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

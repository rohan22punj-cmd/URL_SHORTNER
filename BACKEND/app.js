import express from "express";
const app = express();
import { nanoid } from "nanoid";

app.get("/", (req, res) => {
    res.send(nanoid(7));
})

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
import express from "express";
import axios from "axios";
import cors from "cors";
import config from "config";
import publicRouter from "./controllers/public/index.js";
import "./utils/dbConnect.js";
import path from "path"; // new line
import { fileURLToPath } from "url"; // new line

const app = express();
const PORT = config.get("PORT") || 5006;


const __filename = fileURLToPath(import.meta.url); // new line
const __dirname = path.dirname(__filename); // new line
app.use(express.static(path.join(__dirname, "build"))); // new line

app.use(cors({
    origin: ["http://localhost:5006", "https://cybsec.muzammil.xyz"], // adjust ports based on frontend
}));

app.use(express.json());

// REMOVE this line — it's meaningless and can cause confusion
// app.use("/")

// ✅ API routes
app.use("/api/public", publicRouter);

// ✅ Default root route (optional)
app.get("/", (req, res) => {
    res.send("Phishing Detection Server is live");
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


// ✅ Fallback for unknown routes
app.use((req, res) => {
    res.status(404).json({ msg: "Invalid route" });
});



app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

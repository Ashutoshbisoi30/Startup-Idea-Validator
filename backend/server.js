
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ideasRouter from "./routes/ideas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "https://startup-idea-validator-backend.onrender.com",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors());


app.use(express.json());


app.use((req, _res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});


app.get("/", (_req, res) => {
  res.send("AI Startup Idea Validator API is running");
});


app.use("/ideas", ideasRouter);


async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
}

start();

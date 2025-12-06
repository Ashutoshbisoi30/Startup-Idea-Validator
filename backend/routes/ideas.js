
import express from "express";
import Idea from "../models/Idea.js";
import { analyzeIdeaWithAI } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Calling  AI
    const aiResult = await analyzeIdeaWithAI(title, description);

    const {
      problem,
      customer,
      market,
      competitor,
      tech_stack,
      risk_level,
      profitability_score,
      justification,
    } = aiResult;

    const competitors = Array.isArray(competitor)
      ? competitor.map((c) => ({
          name: c.name || c.title || "",
          differentiation: c.differentiation || c.note || "",
        }))
      : [];

    const idea = await Idea.create({
      title,
      description,
      problem,
      customer,
      market,
      competitors,
      tech_stack,
      risk_level,
      profitability_score,
      justification,
    });

    res.status(201).json(idea);
  } catch (err) {
    console.error("POST /ideas error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/", async (_req, res) => {
  try {
    const ideas = await Idea.find(
      {},
      "title profitability_score risk_level createdAt"
    ).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    console.error("GET /ideas error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.json(idea);
  } catch (err) {
    console.error("GET /ideas/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Idea.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.json({ message: "Idea deleted" });
  } catch (err) {
    console.error("DELETE /ideas/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

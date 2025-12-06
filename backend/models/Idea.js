
import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    problem: String,
    customer: String,
    market: String,
    competitors: [
      {
        name: String,
        differentiation: String,
      },
    ],
    tech_stack: [String],
    risk_level: String,
    profitability_score: Number,
    justification: String,
  },
  { timestamps: true }
);

export default mongoose.model("Idea", IdeaSchema);

import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    order: { type: Number, required: true },
    duration: { type: String, default: "10 min" },
    summary: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Module = mongoose.model("Module", moduleSchema);

import mongoose from "mongoose";

const quizScoreSchema = new mongoose.Schema(
  {
    quizId: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completion: { type: Number, default: 0 },
    completedModules: [{ type: String }],
    lastModuleId: { type: String, default: "" },
    quizScores: [quizScoreSchema],
  },
  { timestamps: true }
);

export const Progress = mongoose.model("Progress", progressSchema);

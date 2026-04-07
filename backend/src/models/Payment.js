import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "inr" },
    provider: { type: String, default: "stripe" },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    sessionId: { type: String, default: "" },
    receiptUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);

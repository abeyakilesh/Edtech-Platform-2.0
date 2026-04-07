import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    studentsCount: { type: Number, default: 0 },
    lessonsCount: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    accent: { type: String, default: "from-sky-500 to-indigo-600" },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);

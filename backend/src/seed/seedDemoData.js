import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Course } from "../models/Course.js";
import { Module } from "../models/Module.js";
import { Progress } from "../models/Progress.js";
import { Quiz } from "../models/Quiz.js";
import { User } from "../models/User.js";
import { demoCourses, demoModules, demoProgress, demoQuizzes } from "../data/demoData.js";

if (!env.mongodbUri) {
  throw new Error("MONGODB_URI is required to seed the database.");
}

await mongoose.connect(env.mongodbUri);

await Promise.all([
  User.deleteMany({}),
  Course.deleteMany({}),
  Module.deleteMany({}),
  Quiz.deleteMany({}),
  Progress.deleteMany({}),
]);

const [adminUser, studentUser] = await User.create([
  {
    name: "EduCore Admin",
    email: "admin@educore.com",
    password: await bcrypt.hash("Password123!", 10),
    role: "admin",
  },
  {
    name: "Demo Student",
    email: "student@educore.com",
    password: await bcrypt.hash("Password123!", 10),
    role: "student",
  },
]);

const insertedCourses = await Course.insertMany(
  demoCourses.map(({ _id, ...course }) => course)
);

const courseMap = new Map(demoCourses.map((course, index) => [course._id, insertedCourses[index]._id]));

await Module.insertMany(
  demoModules.map(({ _id, courseId, ...moduleItem }) => ({
    ...moduleItem,
    courseId: courseMap.get(courseId),
  }))
);

const insertedQuizzes = await Quiz.insertMany(
  demoQuizzes.map(({ _id, courseId, ...quiz }) => ({
    ...quiz,
    courseId: courseMap.get(courseId),
  }))
);

const quizMap = new Map(demoQuizzes.map((quiz, index) => [quiz.courseId, insertedQuizzes[index]._id]));

await Progress.insertMany(
  demoProgress.map(({ _id, userId, courseId, ...progress }) => ({
    ...progress,
    userId: studentUser._id,
    courseId: courseMap.get(courseId),
    quizScores: progress.quizScores.map((item) => ({
      quizId: String(quizMap.get(courseId)),
      score: item.score,
    })),
  }))
);

console.log("EduCore demo data seeded successfully.");
await mongoose.disconnect();

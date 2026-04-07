import { dbState } from "../config/db.js";
import { createMemoryId, memoryStore } from "../data/memoryStore.js";
import { Course } from "../models/Course.js";
import { Module } from "../models/Module.js";
import { Progress } from "../models/Progress.js";

export async function getProgressByUser(req, res) {
  const userId = req.params.userId === "me" ? req.user?._id : req.params.userId;

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (dbState.connected) {
    const progress = await Progress.find({ userId });
    return res.json(progress);
  }

  const progress = memoryStore.progress.filter((item) => item.userId === userId);
  return res.json(progress);
}

export async function updateProgress(req, res) {
  const { courseId, moduleId, completion, markComplete } = req.body;
  const userId = req.user?._id;

  if (!userId || !courseId) {
    return res.status(400).json({ message: "User and course are required" });
  }

  if (dbState.connected) {
    const modules = await Module.find({ courseId });
    const totalModules = modules.length || 1;
    const progress = await Progress.findOne({ userId, courseId });

    const completedModules = new Set(progress?.completedModules || []);
    if (markComplete && moduleId) {
      completedModules.add(moduleId);
    }

    const computedCompletion =
      completion ?? Math.round((completedModules.size / totalModules) * 100);

    const updated = await Progress.findOneAndUpdate(
      { userId, courseId },
      {
        userId,
        courseId,
        completion: computedCompletion,
        completedModules: [...completedModules],
        lastModuleId: moduleId || progress?.lastModuleId || "",
      },
      { upsert: true, new: true }
    );

    return res.json(updated);
  }

  const courseModules = memoryStore.modules.filter((item) => item.courseId === courseId);
  const totalModules = courseModules.length || 1;
  let progress = memoryStore.progress.find((item) => item.userId === userId && item.courseId === courseId);

  if (!progress) {
    progress = {
      _id: createMemoryId("progress"),
      userId,
      courseId,
      completion: 0,
      completedModules: [],
      lastModuleId: "",
      quizScores: [],
    };
    memoryStore.progress.push(progress);
  }

  const completedModules = new Set(progress.completedModules);
  if (markComplete && moduleId) {
    completedModules.add(moduleId);
  }

  progress.completedModules = [...completedModules];
  progress.lastModuleId = moduleId || progress.lastModuleId;
  progress.completion = completion ?? Math.round((completedModules.size / totalModules) * 100);

  return res.json(progress);
}

export async function getDashboardOverview(req, res) {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (dbState.connected) {
    const progress = await Progress.find({ userId });
    const courses = await Course.find({
      _id: { $in: progress.map((item) => item.courseId) },
    });

    const byCourse = new Map(courses.map((course) => [String(course._id), course]));
    const enrolledCourses = progress.map((item) => ({
      progress: item.completion,
      lastModuleId: item.lastModuleId,
      quizScores: item.quizScores,
      course: byCourse.get(String(item.courseId)),
    }));

    return res.json({
      enrolledCourses,
      stats: {
        enrolledCount: enrolledCourses.length,
        averageProgress:
          enrolledCourses.length > 0
            ? Math.round(
                enrolledCourses.reduce((sum, item) => sum + item.progress, 0) / enrolledCourses.length
              )
            : 0,
      },
    });
  }

  const enrolledCourses = memoryStore.progress
    .filter((item) => item.userId === userId)
    .map((item) => ({
      progress: item.completion,
      lastModuleId: item.lastModuleId,
      quizScores: item.quizScores,
      course: memoryStore.courses.find((course) => course._id === item.courseId),
    }))
    .filter((item) => item.course);

  return res.json({
    enrolledCourses,
    stats: {
      enrolledCount: enrolledCourses.length,
      averageProgress:
        enrolledCourses.length > 0
          ? Math.round(
              enrolledCourses.reduce((sum, item) => sum + item.progress, 0) / enrolledCourses.length
            )
          : 0,
    },
  });
}

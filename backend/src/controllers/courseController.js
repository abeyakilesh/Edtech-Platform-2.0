import { dbState } from "../config/db.js";
import { createMemoryId, memoryStore } from "../data/memoryStore.js";
import { Course } from "../models/Course.js";
import { Module } from "../models/Module.js";
import { Progress } from "../models/Progress.js";
import { Quiz } from "../models/Quiz.js";
import { User } from "../models/User.js";

function normalizeCourse(course, userId) {
  const progress = memoryStore.progress.find(
    (item) => item.userId === userId && item.courseId === course._id
  );

  return {
    ...course,
    enrolled: Boolean(progress),
    progress: progress?.completion || 0,
  };
}

export async function getCourses(req, res) {
  if (dbState.connected) {
    const courses = await Course.find().sort({ createdAt: -1 });

    if (!req.user) {
      return res.json(courses);
    }

    const progress = await Progress.find({ userId: req.user._id });
    const progressMap = new Map(progress.map((item) => [String(item.courseId), item]));

    return res.json(
      courses.map((course) => ({
        ...course.toObject(),
        enrolled: progressMap.has(String(course._id)),
        progress: progressMap.get(String(course._id))?.completion || 0,
      }))
    );
  }

  const courses = memoryStore.courses.map((course) =>
    req.user ? normalizeCourse(course, req.user._id) : course
  );

  return res.json(courses);
}

export async function getCourseById(req, res) {
  const { id } = req.params;

  if (dbState.connected) {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const modules = await Module.find({ courseId: id }).sort({ order: 1 });
    const quiz = await Quiz.findOne({ courseId: id });
    const progress = req.user ? await Progress.findOne({ userId: req.user._id, courseId: id }) : null;

    return res.json({
      ...course.toObject(),
      modules,
      quiz,
      progress,
    });
  }

  const course = memoryStore.courses.find((item) => item._id === id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const modules = memoryStore.modules
    .filter((item) => item.courseId === id)
    .sort((a, b) => a.order - b.order);
  const quiz = memoryStore.quizzes.find((item) => item.courseId === id);
  const progress = req.user
    ? memoryStore.progress.find((item) => item.userId === req.user._id && item.courseId === id) || null
    : null;

  return res.json({ ...course, modules, quiz, progress });
}

export async function createCourse(req, res) {
  const payload = req.body;

  if (dbState.connected) {
    const course = await Course.create(payload);
    return res.status(201).json(course);
  }

  const course = {
    _id: createMemoryId("course"),
    studentsCount: 0,
    lessonsCount: 0,
    rating: 5,
    featured: false,
    accent: "from-cyan-400/80 via-blue-500/80 to-violet-600/90",
    ...payload,
  };
  memoryStore.courses.unshift(course);
  return res.status(201).json(course);
}

export async function addModule(req, res) {
  const { id } = req.params;
  const payload = req.body;

  if (dbState.connected) {
    const moduleItem = await Module.create({ ...payload, courseId: id });
    await Course.findByIdAndUpdate(id, { $inc: { lessonsCount: 1 } });
    return res.status(201).json(moduleItem);
  }

  const moduleItem = {
    _id: createMemoryId("module"),
    courseId: id,
    ...payload,
  };
  memoryStore.modules.push(moduleItem);

  const course = memoryStore.courses.find((item) => item._id === id);
  if (course) {
    course.lessonsCount += 1;
  }

  return res.status(201).json(moduleItem);
}

export async function addQuiz(req, res) {
  const { courseId } = req.params;
  const payload = req.body;

  if (dbState.connected) {
    const quiz = await Quiz.create({ ...payload, courseId });
    return res.status(201).json(quiz);
  }

  const quiz = {
    _id: createMemoryId("quiz"),
    courseId,
    ...payload,
  };
  memoryStore.quizzes = memoryStore.quizzes.filter((item) => item.courseId !== courseId);
  memoryStore.quizzes.push(quiz);
  return res.status(201).json(quiz);
}

export async function getModulesByCourse(req, res) {
  const { id } = req.params;

  if (dbState.connected) {
    const modules = await Module.find({ courseId: id }).sort({ order: 1 });
    return res.json(modules);
  }

  const modules = memoryStore.modules
    .filter((item) => item.courseId === id)
    .sort((a, b) => a.order - b.order);
  return res.json(modules);
}

export async function getUsers(req, res) {
  if (dbState.connected) {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json(users);
  }

  return res.json(memoryStore.users.map(({ password, ...user }) => user));
}

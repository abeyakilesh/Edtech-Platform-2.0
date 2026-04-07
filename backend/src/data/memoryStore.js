import { demoCourses, demoModules, demoProgress, demoQuizzes, demoUsers } from "./demoData.js";

export const memoryStore = {
  users: structuredClone(demoUsers),
  courses: structuredClone(demoCourses),
  modules: structuredClone(demoModules),
  quizzes: structuredClone(demoQuizzes),
  progress: structuredClone(demoProgress),
};

export const createMemoryId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

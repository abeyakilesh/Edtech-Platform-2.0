import { dbState } from "../config/db.js";
import { createMemoryId, memoryStore } from "../data/memoryStore.js";
import { Progress } from "../models/Progress.js";
import { Quiz } from "../models/Quiz.js";

export async function getQuizByCourseId(req, res) {
  const { courseId } = req.params;

  if (dbState.connected) {
    const quiz = await Quiz.findOne({ courseId });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.json(quiz);
  }

  const quiz = memoryStore.quizzes.find((item) => item.courseId === courseId);
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  return res.json(quiz);
}

export async function submitQuiz(req, res) {
  const { courseId, answers = [] } = req.body;
  const quiz = dbState.connected
    ? await Quiz.findOne({ courseId })
    : memoryStore.quizzes.find((item) => item.courseId === courseId);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const questions = quiz.questions || [];
  const correctAnswers = questions.reduce(
    (total, question, index) => total + (Number(answers[index]) === Number(question.answer) ? 1 : 0),
    0
  );
  const score = Math.round((correctAnswers / questions.length) * 100);

  if (req.user) {
    if (dbState.connected) {
      const progress = await Progress.findOneAndUpdate(
        { userId: req.user._id, courseId },
        {
          $setOnInsert: { userId: req.user._id, courseId },
          $set: { updatedAt: new Date() },
        },
        { upsert: true, new: true }
      );

      const scores = progress.quizScores.filter((item) => item.quizId !== String(quiz._id));
      scores.push({ quizId: String(quiz._id), score });
      progress.quizScores = scores;
      await progress.save();
    } else {
      const existing = memoryStore.progress.find(
        (item) => item.userId === req.user._id && item.courseId === courseId
      );
      if (existing) {
        existing.quizScores = existing.quizScores.filter((item) => item.quizId !== quiz._id);
        existing.quizScores.push({ quizId: quiz._id, score });
      } else {
        memoryStore.progress.push({
          _id: createMemoryId("progress"),
          userId: req.user._id,
          courseId,
          completion: 0,
          completedModules: [],
          lastModuleId: "",
          quizScores: [{ quizId: quiz._id, score }],
        });
      }
    }
  }

  return res.json({
    score,
    correctAnswers,
    totalQuestions: questions.length,
  });
}

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuizComponent from "../components/QuizComponent";
import { useAuth } from "../context/AuthContext";
import { fetchQuiz, submitQuiz } from "../services/quizService";

function QuizPage() {
  const { courseId } = useParams();
  const { token } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuiz(courseId)
      .then(setQuiz)
      .catch((fetchError) => setError(fetchError.message));
  }, [courseId]);

  async function handleSubmit(answers) {
    setBusy(true);
    setError("");
    try {
      const response = await submitQuiz({ courseId, answers }, token);
      setResult(response);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setBusy(false);
    }
  }

  if (!quiz) {
    return <main className="section-shell py-16 text-slate-300">{error || "Loading quiz..."}</main>;
  }

  return (
    <main className="section-shell space-y-8 pb-16 pt-10">
      <div className="glass-card p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Assessment</p>
        <h1 className="mt-3 text-4xl font-semibold">{quiz.title}</h1>
        <p className="mt-3 text-sm text-slate-300">
          Answer every question, submit once, and your score is saved to progress tracking.
        </p>
      </div>

      {error && <div className="glass-card border-rose-400/20 p-4 text-sm text-rose-200">{error}</div>}
      <QuizComponent quiz={quiz} onSubmit={handleSubmit} result={result} busy={busy} />

      <Link to={`/courses/${courseId}`} className="glass-button">
        Back to course
      </Link>
    </main>
  );
}

export default QuizPage;

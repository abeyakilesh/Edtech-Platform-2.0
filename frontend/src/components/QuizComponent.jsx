import { useState } from "react";

function QuizComponent({ quiz, onSubmit, result, busy }) {
  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(""));

  function handleOptionChange(questionIndex, value) {
    setAnswers((current) => current.map((answer, index) => (index === questionIndex ? value : answer)));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(answers);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {quiz.questions.map((question, questionIndex) => (
        <div key={question.id || questionIndex} className="glass-card p-6">
          <p className="mb-4 text-lg font-semibold">{questionIndex + 1}. {question.question}</p>
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label
                key={`${questionIndex}-${optionIndex}`}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex}
                  checked={String(answers[questionIndex]) === String(optionIndex)}
                  onChange={(event) => handleOptionChange(questionIndex, event.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <button className="primary-button" disabled={busy}>
          {busy ? "Submitting..." : "Submit quiz"}
        </button>
        {result && (
          <div className="glass-card px-5 py-3 text-sm text-slate-200">
            Score: <span className="font-semibold text-cyan-200">{result.score}%</span> ({result.correctAnswers}/
            {result.totalQuestions} correct)
          </div>
        )}
      </div>
    </form>
  );
}

export default QuizComponent;

import { apiRequest } from "./api";

export function fetchQuiz(courseId) {
  return apiRequest(`/quiz/${courseId}`);
}

export function submitQuiz(payload, token) {
  return apiRequest("/quiz/submit", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

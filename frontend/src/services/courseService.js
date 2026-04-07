import { apiRequest } from "./api";

export function fetchCourses(token) {
  return apiRequest("/courses", { token });
}

export function fetchCourse(courseId, token) {
  return apiRequest(`/courses/${courseId}`, { token });
}

export function createCourse(payload, token) {
  return apiRequest("/courses", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function createModule(courseId, payload, token) {
  return apiRequest(`/courses/${courseId}/modules`, {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function createQuiz(courseId, payload, token) {
  return apiRequest(`/courses/${courseId}/quiz`, {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function fetchUsers(token) {
  return apiRequest("/courses/admin/users/list", { token });
}

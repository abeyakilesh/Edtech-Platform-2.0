import { apiRequest } from "./api";

export function fetchDashboardOverview(token) {
  return apiRequest("/progress/dashboard/overview", { token });
}

export function updateProgress(payload, token) {
  return apiRequest("/progress/update", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}

export function fetchProgress(userId, token) {
  return apiRequest(`/progress/${userId}`, { token });
}

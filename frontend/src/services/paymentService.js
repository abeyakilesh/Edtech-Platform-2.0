import { apiRequest } from "./api";

export function createCheckoutSession(courseId, token) {
  return apiRequest("/payments/create-checkout-session", {
    method: "POST",
    token,
    body: JSON.stringify({ courseId }),
  });
}

export function confirmCheckout(courseId, sessionId, token) {
  return apiRequest("/payments/confirm", {
    method: "POST",
    token,
    body: JSON.stringify({ courseId, sessionId }),
  });
}

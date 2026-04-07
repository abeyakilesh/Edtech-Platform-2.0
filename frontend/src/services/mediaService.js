import { apiRequest } from "./api";

export function uploadMedia(file, token) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest("/media/upload", {
    method: "POST",
    token,
    body: formData,
  });
}

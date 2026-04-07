export async function downloadCertificate(courseId, token) {
  const response = await fetch(`/api/certificates/${courseId}/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to download certificate");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${courseId}-certificate.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}

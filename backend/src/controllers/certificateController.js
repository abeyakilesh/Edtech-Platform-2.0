import PDFDocument from "pdfkit";
import { dbState } from "../config/db.js";
import { memoryStore } from "../data/memoryStore.js";
import { Course } from "../models/Course.js";
import { Progress } from "../models/Progress.js";

export async function downloadCertificate(req, res) {
  const { courseId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const course = dbState.connected
    ? await Course.findById(courseId)
    : memoryStore.courses.find((item) => item._id === courseId);
  const progress = dbState.connected
    ? await Progress.findOne({ userId, courseId })
    : memoryStore.progress.find((item) => item.userId === userId && item.courseId === courseId);

  if (!course || !progress || progress.completion < 100) {
    return res.status(400).json({ message: "Certificate is available only after 100% completion" });
  }

  const doc = new PDFDocument({ size: "A4", margin: 48 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${course.title.toLowerCase().replace(/\s+/g, "-")}-certificate.pdf"`
  );

  doc.pipe(res);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#09101f");
  doc
    .roundedRect(36, 36, doc.page.width - 72, doc.page.height - 72, 28)
    .lineWidth(2)
    .strokeColor("#7dd3fc")
    .stroke();

  doc.fillColor("#7dd3fc").fontSize(18).text("EduCore", 0, 100, { align: "center" });
  doc.fillColor("#ffffff").fontSize(32).text("Certificate of Completion", 0, 150, { align: "center" });
  doc
    .fillColor("#cbd5e1")
    .fontSize(14)
    .text("This certifies that", 0, 230, { align: "center" });
  doc.fillColor("#ffffff").fontSize(28).text(req.user.name, 0, 270, { align: "center" });
  doc
    .fillColor("#cbd5e1")
    .fontSize(14)
    .text("has successfully completed", 0, 330, { align: "center" });
  doc.fillColor("#7dd3fc").fontSize(24).text(course.title, 0, 365, { align: "center" });
  doc
    .fillColor("#cbd5e1")
    .fontSize(12)
    .text(`Completion: ${progress.completion}%`, 0, 430, { align: "center" });
  doc
    .text(`Issued on ${new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`, 0, 455, { align: "center" });
  doc.fillColor("#ffffff").fontSize(14).text("EduCore Academic Office", 0, 560, { align: "center" });

  doc.end();
}

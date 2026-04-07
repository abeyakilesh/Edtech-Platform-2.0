import multer from "multer";
import { cloudinary, cloudinaryEnabled } from "../config/cloudinary.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

export const uploadSingleMedia = upload.single("file");

export async function uploadMedia(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  if (cloudinaryEnabled) {
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const resourceType = req.file.mimetype.startsWith("video/") ? "video" : "image";
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "educore",
      resource_type: resourceType,
    });

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      provider: "cloudinary",
    });
  }

  return res.status(201).json({
    url: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
    publicId: "memory-upload",
    provider: "memory",
  });
}

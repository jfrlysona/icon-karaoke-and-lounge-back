import express from "express";
import { upload } from "../middleware/UploadMiddleware.js";

const UploadRouter = express.Router();

UploadRouter.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `${process.env.API_BASE_URL}/api/images/${req.file.filename}`;
    res.status(200).json({ message: "File uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default UploadRouter;

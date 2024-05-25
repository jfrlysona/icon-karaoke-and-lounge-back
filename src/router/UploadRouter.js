import express from "express";
import { upload } from "../middleware/UploadMiddleware.js";

const UploadRouter = express.Router();

UploadRouter.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.uploadFileName) {
      throw new Error("File name not found");
    }
    res.status(200).json({
      message: "File uploaded successfully",
      fileName: req.uploadFileName,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file" });
    console.error(error);
  }
});


export default UploadRouter;

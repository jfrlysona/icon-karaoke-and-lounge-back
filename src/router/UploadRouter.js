const express = require("express");
const { upload } = require("../middleware/UploadMiddleware");

const UploadRouter = express.Router();

UploadRouter.post("/upload", upload.single("image"), (req, res) => {
  try {
    const imageUrl = req.file.path; 
    res.status(201).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = UploadRouter;

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "items",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => {
      const originalName = path.parse(file.originalname).name;
      const timestamp = Date.now();
      return `${originalName}-${timestamp}`;
    },
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };

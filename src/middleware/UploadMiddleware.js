import multer, { diskStorage } from "multer";

export const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    req.uploadFileName = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

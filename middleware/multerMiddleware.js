import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory
  limits: { fieldSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB (adjust as needed)
  fileFilter: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]; // Get file extension from MIME type
    if (!["jpeg", "jpg", "png", "webp", "jfif"].includes(ext)) {
      return cb(new Error(`Unsupported file type: ${ext}`), false);
    }
    cb(null, true);
  },
});

export default upload;

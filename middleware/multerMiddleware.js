import multer from "multer";
import path from "path"
const uploadDir = path.resolve("uploads"); // Absolute path
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir); // Use absolute path
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: { fieldSize: 759476803 * 1000000 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (![".jpg", ".jpeg", ".webp", ".png", ".jfif"].includes(ext)) {
      return cb(new Error(`Unsupported file type ${ext}`), false);
    }
    cb(null, true);
  },
});
export default upload
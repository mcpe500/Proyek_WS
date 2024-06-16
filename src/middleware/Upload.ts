import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = "src/storage/images/profilePictures";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {   
    const user = (req as any).user; 
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, `${user._id}${fileExtension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const fileExtension = path.extname(file.originalname).toLowerCase();

    const checkExtName = filetypes.test(fileExtension);
    const checkMimeType = filetypes.test(file.mimetype);

    if (checkExtName && checkMimeType) {
        cb(null, true);
    } else {
        cb(new Error("Wrong file extension"));
    }
}
});

export default upload;

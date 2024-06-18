"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadDir = "src/storage/images/profilePictures";
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const user = req.user;
        const fileExtension = path_1.default.extname(file.originalname).toLowerCase();
        cb(null, `${user._id}${fileExtension}`);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const fileExtension = path_1.default.extname(file.originalname).toLowerCase();
        const checkExtName = filetypes.test(fileExtension);
        const checkMimeType = filetypes.test(file.mimetype);
        if (checkExtName && checkMimeType) {
            cb(null, true);
        }
        else {
            cb(new Error("Wrong file extension"));
        }
    }
});
exports.default = upload;

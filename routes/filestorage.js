const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileController = require("../controller/filestorage");
const Authentication = require("../middleware/auth");
const multerS3 = require("multer-s3");
const s3Client = require("../config/s3");
const path = require("path");
const { S3_BUCKET_NAME } = process.env;

// Configure S3 Storage
const storage = multerS3({
  s3: s3Client,
  bucket: S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now().toString()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.array("files"),Authentication, fileController.uploadFiles);
router.get("/", Authentication,fileController.getAllFiles);
router.get("/:id",Authentication,fileController.getFileById);
router.delete("/:id", Authentication,fileController.deleteFile);

module.exports = router;

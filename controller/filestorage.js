const File = require("../models/filestorage");

const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/s3");

exports.uploadFiles = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const savedFiles = await Promise.all(
      files.map((file) =>
        File.create({
          filename: file.key,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.location,
          folder: req.body.folder || "root",
        })
      )
    );

    console.log("Files uploaded");
    res.status(201).json({ message: "Files uploaded", files: savedFiles });
  } catch (error) {
    console.error("Upload failed", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};


exports.getAllFiles = async (req, res) => {
  try {
    const { folder } = req.query;
    const filter = folder ? { folder } : {};
    const files = await File.find(filter).sort({ createdAt: -1 });
    console.log("files from db");
    res.json(files);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to fetch files", error });
  }
};


exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      console.log("File not found");
      return res.status(404).json({ message: "File not found" });
    }
    // Delete file from S3
    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.filename,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log("File deleted from S3");
    // Delete from DB
    await file.deleteOne();
    console.log("File deleted from DB");
    res.json({ message: "File deleted" });
  } catch (error) {
    console.error("Deletion failed", error);
    res.status(500).json({ message: "Deletion failed", error });
  }
};


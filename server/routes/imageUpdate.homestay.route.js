import fs from "fs";
import path from "path";
import express from "express";
import multer from "multer";
import pool from "../server.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getHomestayByIdQuery } from "../models/homestay.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/homestays/");
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadHomestayImage = upload.single("image");

router.post("/:id/updateImage", (req, res) => {
    let homestayId = req.params.id;
  uploadHomestayImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    
    const homestay = await pool.query(getHomestayByIdQuery, [homestayId]);
    const { imageIndex } = req.body;
    
    const imagePath = homestay.rows[0].images[imageIndex];

    try {
      fs.unlinkSync(path.join(__dirname, `../../${imagePath}`));
    } catch (err) {
      return console.error("Error deleting file:", err);
    }
    res.status(200).send({
      message: "Image uploaded successfully. Please save changes.",
      image: `/${req.file.path}`,
    });
  });
});

export default router;
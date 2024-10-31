import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { getUserProfileQuery } from '../models/user.model.js';
import pool from '../server.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/users/');
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
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadUserProfile =  upload.single('profile');

router.post('/', (req, res) => {
    uploadUserProfile(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    const {userId}= req.body;
    const profile= await pool.query(getUserProfileQuery, [userId]);
    if(profile.rows[0].profile !== "/images/user/default-profile.jpg"){
      const imagePath= profile.rows[0].profile;
      
      try {
        fs.unlinkSync(path.join(__dirname, `../../${imagePath}`));
      } catch (deleteErr) {
        console.error('Error deleting file:', deleteErr);
      }
    }
    res.status(200).send({
      message: 'Profile uploaded successfully. Please save changes.',
      image: `/${req.file.path}`,
    });
  });
});

export default router;

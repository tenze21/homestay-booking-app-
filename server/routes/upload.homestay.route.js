import path from "path";
import express from "express";
import multer from "multer";

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
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetypes= /image\/jpe?g|image\/png|image\/webp/;

    const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype= mimetypes.test(file.mimetype);

    if(extname && mimetype){
        cb(null, true);
    }else{
        cb(new Error("Images only!"), false);
    }
}

const upload= multer({ storage, fileFilter });
const uploadHomestayImages = upload.array("images", 5);

router.post("/", (req,res)=>{
    uploadHomestayImages(req, res, function(err){
        if(err){
            return res.status(400).send({message: err.message});
        };

        const filePaths= req.files.map((file)=>`/homestays/${file.filename}`);

        res.status(200).send({
            message:"Images uploaded successfully!",
            images: filePaths
        })
    })
});

export default router;
// import multer from 'multer';

// export const upload = multer({storage: multer.diskStorage({})})

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the uploads folder exists
const uploadPath = 'uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Save in 'uploads/' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

export const upload = multer({ storage });

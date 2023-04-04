const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Replace backslashes with forward slashes
    const sanitizedOriginalName = file.originalname.replace(/\\/g, '/');
    cb(null, `${Date.now()}-${sanitizedOriginalName}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

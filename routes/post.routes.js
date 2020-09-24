const Post = require('../models/Post');
const { Router } = require('express');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const { Types } = require('mongoose');
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject a file
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.post('/create', upload.single('img'), async (req, res) => {
  try {
    // const { user: sessUser } = req.session;

    // if (!sessUser) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    console.log(req.file, JSON.stringify(req.body));

    // const user = await User.findById(sessUser.userId);

    return res.json({ message: 'ok' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

module.exports = router;

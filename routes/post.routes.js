const Post = require('../models/Post');
const { Router } = require('express');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const { Types } = require('mongoose');
const router = Router();
const { cloudinary } = require('../utils/cloudnary');

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
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { text } = req.body;

    const user = await User.findById(sessUser.userId);

    const result = await cloudinary.uploader.upload(req.file.path);

    const post = new Post({
      text,
      author: sessUser.userId,
      image: result.url
    });

    user.posts.push(post.id);

    await post.save();

    await user.save();

    return res.json({
      message: 'Post was successfully created!',
      postId: post.id
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = await Post.findById(req.params.id);

    const author = await User.findById(post.author);

    const resAuthorInfo = {
      username: author.username,
      profileImg: author.profileImg
    };

    res.json({ post, author: resAuthorInfo });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;

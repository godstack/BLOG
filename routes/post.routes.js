const Post = require('../models/Post');
const { Router } = require('express');
const User = require('../models/User');
const multer = require('multer');

const upload = multer({
  dest: 'uploads/'
});

const router = Router();

router.post('/create', upload.single(), async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log(req.file);
    // const {title, }

    const user = await User.findById(sessUser);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

module.exports = router;

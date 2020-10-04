const { Router } = require('express');
const User = require('../models/User');
const { cloudinary } = require('../utils/cloudnary');
const router = Router();

router.get('/profile', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(sessUser.userId);

    const resUser = {
      username: user.username,
      birthday: user.birthday,
      profileImg: user.profileImg,
      gender: user.gender,
      bio: user.bio
    };

    res.json({ user: resUser });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { username, bio, birthday, gender } = req.body;

    let result = null;

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const user = await User.findById(user.userId);

    user = {
      ...user,
      username,
      bio,
      birthday,
      gender,
      profileImg: result ? result.url : result
    };

    await user.save();

    res.json({ message: 'User info updated successfully!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

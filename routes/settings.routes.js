const { Router } = require('express');
const User = require('../models/User');
const { cloudinary } = require('../utils/cloudnary');

const upload = require('../utils/upload');
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

router.put('/profile', upload.single('profileImg'), async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let { username, bio, birthday, gender } = req.body;

    const user = await User.findById(sessUser.userId);

    const candidateUsername = await User.findOne({ username });

    if (candidateUsername && user.username !== username) {
      return res
        .status(400)
        .json({ message: 'User with such username already exists' });
    }

    birthday = new Date(birthday);

    const validBirthday = birthday < Date.now();

    if (!validBirthday) {
      return res
        .status(400)
        .json({ message: 'Invalid date. It should be less than now' });
    }

    if (bio.length > 300) {
      return res
        .status(400)
        .json({ message: 'Invalid bio. Max length is 300 characters' });
    }

    let result = null;

    if (result) {
      await cloudinary.uploader.destroy(user.profileImg_public_id);
    }

    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    user.username = username;
    user.bio = bio;
    user.birthday = birthday;
    user.gender = gender;
    user.profileImg = result ? result.url : user.profileImg;
    user.profileImg_public_id = result
      ? result.public_id
      : user.profileImg_public_id;

    await user.save();

    res.json({ message: 'User info updated successfully!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

const { Router } = require('express');
const User = require('../models/User');
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

module.exports = router;

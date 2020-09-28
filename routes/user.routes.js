const { Router } = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = Router();

router.get('/profile/:username', async (req, res) => {
  try {
    const { page } = req.query;

    const PAGE_SIZE = 5;

    const skip = (page - 1) * PAGE_SIZE;

    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Such user does not exist' });
    }

    const postsFromDB = await (await Post.find({ author: user._id })).reverse();

    const posts = [];

    for (let i = skip; i < skip + PAGE_SIZE; i++) {
      if (postsFromDB[i]) {
        posts.push(postsFromDB[i]);
      } else {
        break;
      }
    }

    const resUser = {
      username: user.username,
      profileImg: user.profileImg,
      id: user.id
    };

    const postsCount = await Post.find({ author: user._id }).countDocuments();
    let pagesCount = Math.ceil(postsCount / PAGE_SIZE);

    res.json({ posts, user: resUser, pagesCount, postsCount });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

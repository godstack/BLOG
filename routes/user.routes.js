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
      following: user.following,
      followers: user.followers,
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

router.put('/:username/follow', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { username } = req.params;

    //

    const aimUser = await User.findOne({ username });
    const authorizedUser = await User.findById(sessUser.userId);

    const isFollowed = !!aimUser.followers.find(el =>
      el.equals(authorizedUser._id)
    );

    if (isFollowed) {
      const newFollowersArr = aimUser.followers.filter(
        el => !el.equals(authorizedUser._id)
      );
      aimUser.followers = newFollowersArr;
      const newFollowingArr = authorizedUser.following.filter(
        el => !el.equals(aimUser._id)
      );
      authorizedUser.following = newFollowingArr;
    } else {
      aimUser.followers.push(authorizedUser._id);
      authorizedUser.following.push(aimUser._id);
    }

    await aimUser.save();

    await authorizedUser.save();

    res.json({
      followers: aimUser.followers
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

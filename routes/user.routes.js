const { Router } = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = Router();

router.get('/:username/info', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Such user does not exist' });
    }

    const resUser = {
      username: user.username,
      profileImg: user.profileImg,
      following: user.following,
      followers: user.followers,
      id: user.id,
      posts: user.posts.length
    };

    res.json({ user: resUser });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.get('/:username/posts', async (req, res) => {
  try {
    const { page } = req.query;
    const { username } = req.params;

    const PAGE_SIZE = 5;

    const skip = (page - 1) * PAGE_SIZE;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Such user does not exist' });
    }

    const posts = await Post.find({ author: user._id })
      .sort({ date: 'descending' })
      .skip(skip)
      .limit(PAGE_SIZE);

    const postsCount = await Post.find({ author: user._id }).countDocuments();
    let pagesCount = Math.ceil(postsCount / PAGE_SIZE);

    res.json({ posts, pagesCount });
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

    res.status(200);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.get('/:username/followers', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    const followers = await getUsersList(user.followers);

    return res.json({ users: followers, type: 'Followers' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.get('/:username/following', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    const following = await getUsersList(user.following);

    return res.json({ users: following, type: 'Following' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

async function getUsersList(arr) {
  const resultArr = [];

  for (const id of arr) {
    const user = await User.findById(id);

    resultArr.push({
      username: user.username,
      profileImg: user.profileImg,
      id: user.id,
      followers: user.followers
    });
  }

  return resultArr;
}

module.exports = router;

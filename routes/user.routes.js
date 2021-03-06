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
      _id: user.id,
      posts: user.posts.length,
      bio: user.bio,
      birthday: user.birthday,
      gender: user.gender
    };

    res.json({ user: resUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:username/posts', async (req, res) => {
  try {
    let { page } = req.query;
    page = parseInt(page);
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

    let type = '';

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

      type = 'unfollow';
    } else {
      aimUser.followers.push(authorizedUser._id);
      authorizedUser.following.push(aimUser._id);

      type = 'follow';
    }

    await aimUser.save();

    await authorizedUser.save();

    res.json({ message: 'Followed successfully', type });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:username/followers', async (req, res) => {
  try {
    const { username } = req.params;

    let { page } = req.query;

    page = parseInt(page);

    const PAGE_SIZE = 10;

    const skip = (page - 1) * PAGE_SIZE;

    const user = await User.findOne({ username });

    const followers = await getUsersList(user.followers, skip, PAGE_SIZE);

    const pagesCount = Math.ceil(user.followers.length / PAGE_SIZE);

    return res.json({ users: followers, pagesCount });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:username/following', async (req, res) => {
  try {
    const { username } = req.params;

    let { page } = req.query;

    page = parseInt(page);

    const PAGE_SIZE = 10;

    const skip = (page - 1) * PAGE_SIZE;

    const user = await User.findOne({ username });

    const following = await getUsersList(user.following, skip, PAGE_SIZE);

    const pagesCount = Math.ceil(user.following.length / PAGE_SIZE);

    return res.json({ users: following, pagesCount });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

async function getUsersList(arr, skip, PAGE_SIZE) {
  const filteredArr = [];

  for (let i = skip; i < skip + PAGE_SIZE; i++) {
    if (arr[i]) {
      filteredArr.push(arr[i]);
    } else {
      break;
    }
  }

  const resultArr = [];

  for (const id of filteredArr) {
    const user = await User.findById(id);

    resultArr.push({
      username: user.username,
      profileImg: user.profileImg,
      _id: user.id,
      followers: user.followers
    });
  }

  return resultArr;
}

router.get('/all-users', async (req, res) => {
  try {
    let { page } = req.query;
    page = parseInt(page);

    const PAGE_SIZE = 10;

    const skip = (page - 1) * PAGE_SIZE;

    const users = await User.find({}).skip(skip).limit(PAGE_SIZE);

    const count = await User.find({}).countDocuments();
    const pagesCount = Math.ceil(count / PAGE_SIZE);

    res.json({ users, pagesCount });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

const Post = require('../models/Post');
const { Router } = require('express');
const User = require('../models/User');
const path = require('path');
const { Types } = require('mongoose');
const router = Router();
const { cloudinary } = require('../utils/cloudnary');
const upload = require('../utils/upload');

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
      image: result.url,
      public_id: result.public_id
    });

    user.posts.push(post.id);

    await post.save();

    await user.save();

    return res.json({
      message: 'Post was successfully created!',
      authorUsername: sessUser.username
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

router.put('/:postId/like', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { postId } = req.params;

    const post = await Post.findById(postId);

    const isLikedByUser = post.likes.find(el => el.equals(sessUser.userId));

    if (isLikedByUser) {
      post.likes = post.likes.filter(el => !el.equals(sessUser.userId));
    } else {
      post.likes.push(sessUser.userId);
    }

    await post.save();

    res.status(200);
  } catch (e) {
    res
      .status(500)
      .json({ message: e.message || 'Something went wrong, try again' });
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { postId } = req.params;

    const user = await User.findById(sessUser.userId);

    const isPostExist = user.posts.find(id => id.equals(postId));

    if (!isPostExist) {
      return res.status(400).json({ message: "User don't have such post" });
    }

    user.posts = user.posts.filter(id => !id.equals(postId));

    const post = await Post.findById(postId);

    await cloudinary.uploader.destroy(post.public_id);

    await post.remove();

    await user.save();

    res.json({ postId, message: 'Post was successfully deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed delete post' });
  }
});

module.exports = router;

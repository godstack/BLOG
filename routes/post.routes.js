const Post = require('../models/Post');
const { Router } = require('express');
const User = require('../models/User');
const path = require('path');
const { Types } = require('mongoose');
const router = Router();
const { cloudinary } = require('../utils/cloudnary');
const upload = require('../utils/upload');
const { getSocketIo } = require('../app');
const io = getSocketIo();

console.log(io);

router.post('/create', upload.single('img'), async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { text, hashtags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const user = await User.findById(sessUser.userId);

    const result = await cloudinary.uploader.upload(req.file.path);

    const post = new Post({
      text,
      author: sessUser.userId,
      image: result.url,
      public_id: result.public_id,
      hashtags
    });

    user.posts.push(post.id);

    await post.save();

    await user.save();

    return res.json({
      message: 'Post was successfully created!',
      authorUsername: sessUser.username
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = await Post.findById(req.params.id);

    res.json({ postText: post.text, hashtags: post.hashtags });
  } catch (e) {
    res.status(500).json({ message: e.message });
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

    res.json({ message: 'Successfully' });
  } catch (e) {
    res.status(500).json({ message: e.message });
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

router.put('/:postId', upload.single('img'), async (req, res) => {
  try {
    const { user: sessUser } = req.session;

    if (!sessUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { text } = req.body;

    const { postId } = req.params;

    const user = await User.findById(sessUser.userId);

    const isPostExist = user.posts.find(id => id.equals(postId));

    if (!isPostExist) {
      return res.status(400).json({ message: "User don't have such post" });
    }

    const post = await Post.findById(postId);

    let result = null;

    if (req.file) {
      await cloudinary.uploader.destroy(post.public_id);
      result = await cloudinary.uploader.upload(req.file.path);
    }

    post.image = result ? result.url : post.image;
    post.text = text;

    await post.save();

    await user.save();

    res.json({ postId, message: 'Post was successfully edited' });
  } catch (e) {
    res.status(500).json({ message: 'Failed edit post' });
  }
});

module.exports = router;

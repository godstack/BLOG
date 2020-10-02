const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = Router();

router.get('/all-users', async (req, res) => {
  try {
    let { page } = req.query;
    page = parseInt(page);
    const PAGE_SIZE = 5;

    const skip = (page - 1) * PAGE_SIZE;

    const postsFromDB = await Post.find({})
      .sort({ date: 'descending' })
      .skip(skip)
      .limit(PAGE_SIZE);

    const posts = [];

    for (let i = 0; i < postsFromDB.length; i++) {
      const author = await User.findById(postsFromDB[i].author);

      const partAuthor = {
        _id: author.id,
        username: author.username,
        profileImg: author.profileImg
      };

      const post = {
        _id: postsFromDB[i].id,
        image: postsFromDB[i].image,
        likes: postsFromDB[i].likes,
        date: postsFromDB[i].date,
        text: postsFromDB[i].text,
        author: partAuthor
      };

      posts.push(post);
    }

    const count = await Post.find({}).countDocuments();

    const pagesCount = Math.ceil(count / PAGE_SIZE);

    res.json({ posts, pagesCount });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

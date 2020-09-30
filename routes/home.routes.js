const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = Router();

// router.get('/users', async (req, res) => {
//   try {
//     const { page } = req.params;

//     const postsFromDb = await (await Post.find({}).ski).reverse().skip;

//     const filteredPosts = [];

//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: e.message });
//   }
// });

module.exports = router;

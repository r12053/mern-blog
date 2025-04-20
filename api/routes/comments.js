const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Get comments for a blog post
router.get('/:blogId', async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment
router.post('/', async (req, res) => {
  const { blogId, author, content } = req.body;

  try {
    const newComment = new Comment({ blogId, author, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

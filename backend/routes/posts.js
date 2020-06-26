const express = require("express")
const router = express.Router()
const postsController = require("./../middleware/posts")

// GET /api/posts
router.get('/api/posts', postsController.getPosts)

// POST /api/posts
router.post('/api/posts', postsController.postPosts)

module.exports = router;
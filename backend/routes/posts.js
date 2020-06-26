const express = require("express")
const router = express.Router()
const postsController = require("./../middleware/posts")

// GET /api/posts
router.get('/api/posts', postsController.getPosts)

// POST /api/posts
router.post('/api/posts', postsController.postPosts)

// DELETE /api/post/:postId
router.delete('/api/post/:postId', postsController.deletePost)

module.exports = router;
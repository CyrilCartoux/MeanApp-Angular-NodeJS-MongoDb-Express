const express = require("express")
const router = express.Router()
const postsController = require("./../controllers/posts")
const isAuth = require("./../middleware/is-auth")
const multer = require("./../middleware/multer")

// GET /api/posts
router.get('/api/posts', postsController.getPosts)
// GET /api/post/:postId
router.get('/api/post/:postId', postsController.getPost)

// POST /api/posts
router.post('/api/posts', isAuth, multer, postsController.postPosts)

// DELETE /api/post/:postId
router.delete('/api/post/:postId', isAuth, postsController.deletePost)

// PUT /api/post/:postId
router.put('/api/post/:postId', isAuth, multer, postsController.editPost)



module.exports = router;
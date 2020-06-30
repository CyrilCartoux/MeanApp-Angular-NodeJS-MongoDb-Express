const express = require("express")
const router = express.Router()
const postsController = require("./../middleware/posts")

const multer = require("multer");
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype]
        console.log(file.mimetype)
        let error = new Error("Invalid mime type")
        if (isValid) {
            error = null
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension)
    }
})

// GET /api/posts
router.get('/api/posts', postsController.getPosts)

// POST /api/posts
router.post('/api/posts', multer({storage: storage}).single("image"), postsController.postPosts)

// DELETE /api/post/:postId
router.delete('/api/post/:postId', postsController.deletePost)

// PUT /api/post/:postId
router.put('/api/post/:postId', multer({storage: storage}).single("image"), postsController.editPost)

// GET /api/post/:postId
router.get('/api/post/:postId', postsController.getPost)

module.exports = router;
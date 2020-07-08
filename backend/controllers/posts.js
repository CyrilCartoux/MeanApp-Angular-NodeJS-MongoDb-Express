const Post = require("./../models/posts")

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: fetchedPosts,
                maxPosts: count
            });
        });
};

exports.getPost = async (req, res, next) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId)

    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: 'Post not found' })
    }
}

exports.postPosts = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    })
    newPost.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added',
                post: {
                    id: createdPost._id,
                    title: createdPost.title,
                    content: createdPost.content,
                    imagePath: createdPost.imagePath
                }
            })
        })
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    Post.deleteOne({ creator: req.userData.userId, _id: postId })
        .then(result => {
            if (result.n === 0) {
                return res.status(404).json({
                    message: 'Cannot delete posts you did not create'
                })
            }
            res.status(200).json({
                message: 'post deleted'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.editPost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + '/images/' + req.file.filename
    }
    const postId = req.params.postId;
    const editedPost = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    })
    Post.updateOne({ creator: req.userData.userId, _id: postId }, editedPost)
        .then(result => {
            if (result.nModified === 0) {
                return res.status(404).json({ message: "Cannot update posts you did not create" })
            }
            res.status(200).json({ message: 'post updated' })
        })
        .catch(err => {
            console.log(err)
        })
}
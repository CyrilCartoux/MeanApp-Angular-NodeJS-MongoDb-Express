const Post = require("./../models/posts")
let posts;

exports.getPosts = async (req, res, next) => {
    const posts = await Post.find()
    if (!posts) {
        const error = new Error("No posts found")
        error.status = 404;
        throw (error)
    }
    console.log('posts founded' + posts)
    res.status(200).json({
        message: "post fetched",
        posts: posts
    })
}

exports.postPosts = (req, res, next) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    })
    newPost.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added',
                postId: createdPost._id
            })
        })
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    Post.deleteOne({ _id: postId })
        .then(result => {
            res.status(200).json({
                message: 'post deleted'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.editPost = (req, res, next) => {
    const postId = req.params.postId;
    const newPost = {
        title: req.body.title,
        content: req.body.content
    }
    Post.findById(postId)
        .then(post => {
            console.log(post)
            post.title = newPost.title;
            post.content = newPost.content;
            return post.save()
                .then(result => {
                    console.log(result)
                    res.status(200).json({ message: 'post updated' })
                })
                .catch(err => {
                    console.log(err)
                })
        })

}
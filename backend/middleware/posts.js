const Post = require("./../models/posts")
let posts;

exports.getPosts = async (req, res, next) => {
    const posts = await Post.find()
    if (!posts) {
        const error = new Error("No posts found")
        error.status = 404;
        throw(error)
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
    newPost.save();
    res.status(201).json({
        message: 'Post added',
        post: newPost
    })
}
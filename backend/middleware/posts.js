let posts;

exports.getPosts = (req, res, next) => {
    posts = [{
        id: "123456",
        title: 'Hello',
        content: 'World'
    }, {
        id: "456789",
        title: 'Buy',
        content: 'Bitcoin'
    }];
    res.status(200).json({
        message: "post fetched",
        posts: posts
    })
}

exports.postPosts = (req, res, next) => {
    const newPost = req.body;
    res.status(201).json({
        message: 'Post added'
    })
}
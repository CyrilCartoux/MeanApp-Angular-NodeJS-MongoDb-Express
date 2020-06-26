const express = require("express")
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/posts', (req, res, next) => {
    const posts = [{
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
})

module.exports = app;
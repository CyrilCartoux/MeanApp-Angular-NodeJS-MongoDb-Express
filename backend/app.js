const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const postRoutes = require("./routes/posts");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept');
    next();
});

app.use(postRoutes)

module.exports = app;
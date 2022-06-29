const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const postRoutes = require("./routes/posts")
const authRoutes = require("./routes/auth")
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use(postRoutes)
app.use(authRoutes)
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
})

module.exports = app;
const express = require("express")
const router = express.Router();
const authController = require("./../controllers/auth")

// POST /signup
router.post('/signup', authController.signup);

// POST /signin
router.post('/login',  authController.login);

module.exports = router;
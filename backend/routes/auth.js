const express = require("express")
const router = express.Router();
const authController = require("./../controllers/auth")

// POST /login
router.post('/signup', authController.signup);

module.exports = router;
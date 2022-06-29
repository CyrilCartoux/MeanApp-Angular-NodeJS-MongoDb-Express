const User = require("./../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword
            })
            return user.save()
        })
        .then(result => {
            res.status(201).json({
                message: "User created",
                email: result.email,
                userId: result._id
            })
        })
        .catch(err => {
            console.log('err :>> ', err);
            res.status(500).json({
                message: 'Invalid authentication credentials!'
            })
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error("Invalid email or password")
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        const error = new Error("Invalid email or password")
                        error.statusCode = 401;
                        throw error;
                    }
                    const token = jwt.sign({
                        email: loadedUser.email,
                        userId: loadedUser._id
                    }, process.env.JWT_KEY, { expiresIn: '1h' })
                    res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        userId: loadedUser._id
                    })
                })
                .catch(err => {
                    console.log('err :>> ', err);
                    res.status(401).json({
                        message: 'Invalid authentication credentials!'
                    })
                })
        })
}
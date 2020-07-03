const User = require("./../models/user")
const bcrypt = require("bcryptjs")

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
                userId: result._id
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }) 
}
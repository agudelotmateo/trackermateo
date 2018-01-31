// routing for '/users'

// imports
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");
const router = express.Router();

// '/users/register' route
router.post("/register", function (req, res, next) {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.getUserByUsername(newUser.username, function (err, user) {
        if (err)
            throw err;
        if (user)
            return res.json({ success: false, msg: "Username already in use" });
        User.getUserByEmail(newUser.email, function (err, user) {
            if (err)
                throw err;
            if (user)
                return res.json({ success: false, msg: "Email already in use" });
            User.addUser(newUser, function (err, user) {
                if (err)
                    res.json({ success: false, msg: "Failed to register user" });
                else
                    res.json({ success: true, msg: "User successfully registered" });
            });
        });
    });
});

// '/users/authenticate' route
router.post("/authenticate", function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, function (err, user) {
        if (err)
            throw err;
        if (!user)
            return res.json({ success: false, msg: "User not found" });
        User.comparePasswords(password, user.password, function (err, match) {
            if (err)
                throw err;
            if (match) {
                // after upgrade, getting it as object using `.toObject()` is required
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else
                res.json({ success: false, msg: "Wrong password" });
        });
    });
});

// '/users/profile' route
router.get("/profile", passport.authenticate("jwt", { session: false }), function (req, res, next) {
    res.json({
        user: req.user
    });
});

// export the router
module.exports = router;

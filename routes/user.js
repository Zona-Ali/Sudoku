const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require('passport');
const { redirectUrl } = require("../middle.js");
const callback = require("../controllers/user.js")


//signUp
router.get("/signup", wrapAsync(callback.signupform))
router.post("/signup", wrapAsync(callback.signup))


//logIn
router.get("/login", wrapAsync(callback.loginform))

router.post("/login", redirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), wrapAsync(callback.login))


//logOut
router.get("/logout", wrapAsync(callback.logout))


module.exports = router;
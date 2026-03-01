const User = require("../models/user.js");


//signUp
module.exports.signupform=async (req, res, next) => {
    res.render("./pages/signup.ejs")
}
module.exports.signup=async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let newUser = new User({ email, username })
        let register = await User.register(newUser, password)
        req.login(register, (err) => {
            if (err) {
                return next(err)
            } req.flash("success", "Welcome to Wanderlust!")
            res.redirect("/")
        })
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}


//logIn
module.exports.loginform=async (req, res, next) => {
    res.render("./pages/login.ejs")
}
module.exports.login=async (req, res) => {
    req.flash("success", "Welcome to Wanderlust!")
    let url = res.locals.redirect || "/"
    res.redirect(url)
}


//logOut
module.exports.logout=async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("error", "You're Logged out")
        res.redirect("/")
    }
    )
}




module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.newUrl = req.originalUrl;
        req.flash("error", "You're not Loggedin")
        return res.redirect("/login")
    } else {
        next()
    }
}

module.exports.redirectUrl = (req, res, next) => {
    if (req.session.newUrl) {
        res.locals.redirect = req.session.newUrl;
    }
    next()
}


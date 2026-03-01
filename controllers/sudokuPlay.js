const { play } = require("../logic.js")
const Users = require("../models/user.js");


module.exports.chooseLev = (req, res) => {
    res.render("./pages/chooseLev.ejs")
}

module.exports.displayLev = (req, res) => {
    let { lev } = req.body;
    res.redirect(`/sudokuPlay/${lev}`)
}

module.exports.prepLev = async (req, res) => {
    let { lev } = req.params;
    let { display, sudokuValues } = play(lev);
    req.session.sol = sudokuValues;
    req.session.startTime = new Date().getTime();
    res.render("./pages/play.ejs", { arr: display, sol: sudokuValues, lev: lev })
}

module.exports.playLev = async (req, res) => {
    let { lev } = req.params;
    let user = await Users.findOne({ username: req.session.passport.user });
    const totalSeconds = Math.floor((Date.now() - req.session.startTime) / 1000);
    let levelField = `timeL${lev}`;
    let currentTime = user[levelField] || 0;

    if (currentTime === 0 || totalSeconds < currentTime) {
        await Users.updateOne(
            { username: req.session.passport.user },
            { $set: { [levelField]: totalSeconds } }
        );
    }

    res.redirect(`/sudokuPlay/${lev}/${totalSeconds}`);
}

module.exports.resultLev = async (req, res) => {
    let { l, totalSeconds } = req.params;
    totalSeconds = parseInt(totalSeconds);
    let levelField = `timeL${l}`;
    let user = await Users.findOne({ username: req.session.passport.user });
    let list = await Users.find({
        [levelField]: { $gt: 0 }
    }).sort({ [levelField]: 1 });

    let time = `${String( Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;

    res.render("./pages/result.ejs", {time,l,list,levelField,user});
}

module.exports.overLev = (req, res) => {
    res.render("./pages/gameover.ejs")
}

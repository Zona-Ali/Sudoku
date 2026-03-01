const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require('passport');
const callback = require("../controllers/sudokuPlay.js")
const {isLoggedin } = require("../middle.js");

router.get("/",isLoggedin,callback.chooseLev)

router.post("/" ,callback.displayLev)

router.get("/over",callback.overLev)

router.get("/:lev",wrapAsync(callback.prepLev))

router.post("/:lev",wrapAsync(callback.playLev));

router.get("/:l/:totalSeconds",wrapAsync(callback.resultLev));
 
module.exports = router;
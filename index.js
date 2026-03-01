if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const dbUrl = process.env.ATLASDB_URL;
const express=require("express");
const app=express();
const path=require("path");
const methodOverride =require('method-override');
const ejsmate =require("ejs-mate");
const session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");
const mongoose = require('mongoose');


main().then(()=>{console.log("connection made...")})
.catch((err)=>{
    console.log(err)
})


async function main() {
    await mongoose.connect(dbUrl)
}


const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("./models/user.js");


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public/")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine("ejs",ejsmate);
const user = require("./routes/user.js");
const sudokuSolver = require("./routes/sudokuSolver.js");
const sudokuPlay = require("./routes/sudokuPlay.js");


const store= MongoStore.create({
     mongoUrl:dbUrl,
     crypto: {
        secret :process.env.SECRET,
     },
     touchAfter:24*3600,
})
store.on("error",(err)=>{
    console.log("ERROR IN MONGO SESSION STORE ",err)
})
app.use(session({
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()*7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}))
app.use(flash())


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());
app.use("/",(req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
})
app.get("/home",(req,res)=>{
    res.render("./pages/home.ejs")
})
app.use("/", user)
app.use("/sudokuSolver", sudokuSolver)
app.use("/sudokuPlay", sudokuPlay)



app.listen(8080,()=>{
    console.log("listening on port")
})



  
  
    
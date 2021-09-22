//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const connectDB = require("./models/index");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", function (req, res) {
  let { username, password } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const newUser = new User({
      email: username,
      password: hash,
    });

    newUser.save( function(err){
      if(err){
        console.log(err);
      }else{
        res.render("secrets")
      }
    })
  });
});

app.post("/login", function (req, res) {
  const { username, password } = req.body;
  User.findOne({ email: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, (err, result) => {
          if (result == true) {
            res.render("secrets");
          }
        });
      }
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
connectDB();

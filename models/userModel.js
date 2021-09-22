const mongoose = require("mongoose");
// const  md5 = require('md5');
// const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});



const User = new mongoose.model("user", userSchema) //model

module.exports = User


















// const secret = process.env.SECRETS;
//userSchema.plugin(encrypt, { secret: secret, encryptedFields:["password"] }); //this code encrypts the whole database

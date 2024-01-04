const mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost:27017/UserDB")
const Posts = require("./post.js").PostSchema

console.log("User Schema Has been Called")

const UserSchema = new mongoose.Schema(
    {
        Username : {
            type: String,
            unique: [true,"Username is already taken!"],
            required: [true,"Username was not entered!"],
            minlength: 3,
            maxlength: 50,
        },
        Email: {
            type: String,
            required : [true,"A account already has this email!"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        Password : {
            type: String,
            unique: [true,"A Account already exsists with this password!"],
            required : [true,"Password is not valid!"],
            minlength : 8,
            maxlength : 20
        },
        Posts : [Posts]
    }
)


module.exports = {UserSchema}
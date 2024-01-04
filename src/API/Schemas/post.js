const mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost:27017/UserPostsDB")
console.log("User Post Schema Has Been Called")


const PostSchema = new mongoose.Schema(
    {
        Title : {
            type : String,
            required : [true, "invalid Title!"]
        },
        Description : String,
        User : {
            type : String,
            required : [true, "Post Author is missing!"]
        },
        Votes : {
            type : Number,
            required : [true, "Missing the upvotes!"]
        },
        Tag : {
            type : String,
            required : [true, "You must need a Post ID!"]
        },
        Comments : {type : Array, "default" : [], strict : false}
    }
)

module.exports = {PostSchema}
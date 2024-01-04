const mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost:27017/ReportsDB")

console.log("Report Schema Has Been Called")

const ReportSchema = new mongoose.Schema({
    User : {
        type : String,
        required : [true,"Please make sure the username is valid!"]
    },
    Reason : {
        type : String,
        required : [true, "Please enter a reason!"]
    }
})

module.exports = {ReportSchema}
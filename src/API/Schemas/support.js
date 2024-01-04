const mongoose = require("mongoose");
mongoose.createConnection("mongodb://localhost:27017/SupportDB")
console.log("Support Schema Has Been Called")

const SupportSchema = new mongoose.Schema({
    FirstName : {
        type : String,
        required : [true,"First name is required!"]
    },
    LastName : {
        type : String,
        required : [true,"Last name is required!"]
    },
    PhoneNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
})

module.exports = {SupportSchema}
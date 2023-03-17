const mongoose = require("mongoose");

// Schema for Paid customer
const employeeSchema = new mongoose.Schema({
    Emailaddress:{
        type: String,
        require: true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
        unique:true
    }
})
const Register = new mongoose.model("Register",employeeSchema);


// Schema for the customer who want to register
const RegisterSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true,
        unique:true
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Phone:{
        type:Number,
        require:true,
    },
    Whatsapp:{
        type:Number,
        require:true,
    }
})
const Buynow = new mongoose.model("Buynow",RegisterSchema);


module.exports = {Buynow,Register}
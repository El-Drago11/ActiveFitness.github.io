const mongoose = require("mongoose")
const validator = require("validator") // Npm validation 
const { boolean } = require("webidl-conversions");
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1/sportsFitness")
.then(()=>{
    console.log("connection succesfull")
})
.catch((err)=>{
    console.log(err)
})

const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

//create a collection

const Register = new mongoose.model("registers",userschema);

module.exports=Register;
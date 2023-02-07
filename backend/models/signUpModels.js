const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    surname:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
      type: String,
      required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    refreshToken: String
})

module.exports = mongoose.model('ZTI', signUpTemplate, 'users')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    adminId : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : false
    }
}) 

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin;
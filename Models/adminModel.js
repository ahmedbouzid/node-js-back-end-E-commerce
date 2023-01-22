const mongoose = require('mongoose')
const userModel = require('./UserModel')



adminSchema = new mongoose.Schema({



})
const Admin = userModel.discriminator('admin' , adminSchema)
module.exports = mongoose.model('admin')
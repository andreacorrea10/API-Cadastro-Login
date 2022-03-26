const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    cpf: String,
    rg: String,
    email: String,
    password: String,
})

module.exports = User
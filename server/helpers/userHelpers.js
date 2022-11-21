
const User = require('../model/userModel')

exports.findUser = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email : email })
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.validateUser = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email : email, password : password })
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
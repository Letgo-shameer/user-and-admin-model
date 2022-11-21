const Admin = require('../model/adminModel')
const User = require('../model/userModel')

exports.verifyAdmin = (adminId, password) => {
    return new  Promise((resolve, reject) => {
        Admin.findOne({adminId : adminId, password:password})
        .then((admin) => {
            resolve(admin)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

exports.findAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .then((users) => {
                resolve(users)
            })      
            .catch((err) => {
                 reject(err)
            }) 
    })
}

exports.findUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id : id })
            .then((user) => {
                resolve(user)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.updateUser = (id, updatedUser) => {
    return new Promise((resolve, reject) => {
        User.updateOne({ _id : id }, { $set : { name : updatedUser.name, email : updatedUser.email, password : updatedUser.password } })
            .then(() => {
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({ _id : id })
            .then(() => {
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
    })
}
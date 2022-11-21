const adminHelpers = require('../helpers/adminHelpers')
const userHelpers = require('../helpers/userHelpers')
const User = require('../model/userModel')

//validation
const validation = {
    loginValidation : false,
    userExists : false
}

// Session Handling
exports.isLoggedIn = (req, res, next) => {
    if(req.session.adminId){
        next()
    }else{
        res.redirect('/admin/login')
    }
} 

exports.isLoggedOut = (req, res, next) => {
    if(!req.session.adminId){
        next()
    }else{
        res.redirect('/admin/home')
    }
}

exports.adminLanding = (req, res) => {
    res.redirect('/admin/login')
}

exports.adminLoginPage = (req, res) => {
    res.render('admin/login', { validation })
    validation.loginValidation = false
}

exports.adminHome = (req, res) => {
    adminHelpers.findAllUsers() 
        .then((users) => {
            res.render("admin/home", { users })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.addUserPage = (req, res) => {
    res.render('admin/addUser', { validation })
    validation.userExists = false
}

exports.editUserPage = (req, res) => {
    adminHelpers.findUser(req.query.id)
        .then((user) => {
            res.render('admin/editUser', { user })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.adminLogin = (req, res) => {
    adminHelpers.verifyAdmin(req.body.adminId, req.body.pass)
        .then((admin) => {
            if(admin){
                req.session.adminId = req.body.adminId
                res.redirect('/admin/home')
            }else{
                validation.loginValidation = true
                res.redirect('/admin/login')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.addUser = (req, res) => {
    userHelpers.findUser(req.body.email)
        .then((user) => {
            if(!user){
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email, 
                    password : req.body.pass
                }) 
                newUser.save()
                    .then(() => {
                        res.redirect('/admin');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }else{
                validation.userExists = true
                res.redirect('/admin/addUser')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.editUser = (req, res) => {
    const updatedUser = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.pass
    }
    adminHelpers.updateUser(req.query.id, updatedUser)
        .then(() => {
            res.redirect('/admin/home')
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.deleteUser = (req,res) => {
    adminHelpers.deleteUser(req.query.id)
        .then(() => {
            res.redirect('/admin/home')
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.adminLogout = (req, res) => {
    req.session.adminId = ''
    res.redirect('/admin/login')
}


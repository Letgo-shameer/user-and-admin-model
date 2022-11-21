const User = require('../model/userModel')
const userHelpers = require('../helpers/userHelpers')

//validation
const validation = {
    userExists : false,
    passMismatch : false,
    loginValidation : false
}

//handling session
exports.isLoggedIn = (req, res, next) => {
    if(req.session.userId){
        next();
    }else{
        res.redirect('/user/login')
    }
}

exports.isLoggedOut = (req, res, next) => {
    if(!req.session.userId){
        next();
    }else{
        res.redirect('/user/home')
    }
}

exports.userLanding = (req, res) => {
    res.redirect('/user/login');
}

exports.userLoginPage = (req, res) => {
    res.render('user/login', { validation });
    validation.loginValidation = false
}

exports.userSignupPage =  (req, res) => {
    res.render('user/signup', { validation });
    validation.userExists = false
    validation.passMismatch = false
}

exports.userHome = (req, res) => {
    res.render('user/home')
}

exports.userSignup = (req,res) => {
    if(req.body.pass===req.body.confPass){
        userHelpers.findUser(req.body.email)
            .then((user) => {
                if(!user){
                    const newUser = new User({
                        name : req.body.username,
                        email : req.body.email, 
                        password : req.body.pass
                    }) 
                    newUser.save()
                        .then(() => {
                            res.redirect('/user/login');
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }else{
                    validation.userExists = true
                    res.redirect('/user/signup')
                }
            }) 
            .catch((err) => {
                console.log(err);
            })

    }else{
        validation.passMismatch = true
        res.redirect("/user/signup")
    }
}

exports.userLogin = (req, res) => {
    userHelpers.validateUser(req.body.email, req.body.pass)
        .then((user) => {
            if(user){
                req.session.userId = req.body.email
                console.log(req.session);
                res.redirect('/user/home')
            }else{
                validation.loginValidation = true
                res.redirect('/user/login')
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.userLogout = (req, res) => {
    req.session.userId = ''
    res.redirect('/user/login')
}
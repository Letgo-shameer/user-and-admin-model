const express = require('express')
const adminController = require("../controller/adminController");

const router = express.Router();

router.get('/admin', adminController.isLoggedOut, adminController.adminLanding)

router.get('/admin/login', adminController.isLoggedOut, adminController.adminLoginPage)

router.get('/admin/home', adminController.isLoggedIn, adminController.adminHome)

router.get('/admin/adduser', adminController.isLoggedIn, adminController.addUserPage)

router.get('/admin/editUser', adminController.isLoggedIn, adminController.editUserPage)

//post

router.post('/admin/login', adminController.adminLogin)

router.post('/admin/addUser', adminController.addUser)

router.post('/admin/editUser', adminController.editUser)

router.post('/admin/deleteUser', adminController.deleteUser)

router.post('/admin/logout', adminController.adminLogout)


module.exports = router
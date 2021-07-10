const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');

const User = require('../models/user');
const users = require('../controllers/users');

// register an account
router.get('/register', users.registerForm);

router.post('/register', catchAsync(users.registerUser));

// loggin in
router.get('/login', users.loginForm);

router.post('/login', 
    passport.authenticate ('local', { failureFlash: true, failureRedirect: '/login'}),
    users.loginUser);

router.get('/logout', users.logout);

module.exports = router;
const express = require('express')
const router = express.Router()
const passport = require('passport')
const initializePassport = require('../config')
const bcrypt = require('bcryptjs')

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

router.get('/', checkAuthenticated, (req, res) => {
    res.render('home.ejs', { name: req.user.name })
})

// Login page route
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

// Logim post route
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

// Register post route
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(users);
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

// Delete a route
router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// Check if user Authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// Check if user Not Authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
module.exports = router
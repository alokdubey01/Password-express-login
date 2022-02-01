const express = require('express')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const router = require('./router/routes')
const bodyParser = require('body-parser')
const app = express()
require('./conn')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
const port = 3000 || process.env.PORT
app.set('view engine', 'ejs')

app.use(router)

app.listen(port, () => {
    console.log('Server starded...')
})
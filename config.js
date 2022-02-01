const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/User')

module.exports = function(passport) {
    const authUser = async (email, password, done) => {
        // const user = getUserByEmail(email)
        User.findOne({
            email:email
        }).then(user =>{
            if (user == null) {
                return done(null, false, {
                    message: 'No user with this email'
                })
            }
            bcrypt.compare(password, user.password,(err, isMatch) =>{
                if(err) throw err
                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null,false,{
                        message: 'check your password'
                    })
                }
            })
        })
        // if (user == null) {
        //     return done(null, false, {
        //         message: 'No user with this email'
        //     })
        // }
        // try {
        //     if (await bcrypt.compare(password, user.password)) {
        //         return done(null, user)
        //     }
        //     else {
        //         return done(null, false, {
        //             message: 'check your password'
        //         })
        //     }
        // }
        // catch (e) {
        //     return done(e)
        // }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, function(err,user){
            done(err, user)
        })
        // return done(null, getUserById(id))
    })
}

// module.exports = initialize
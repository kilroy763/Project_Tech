const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if( user == null){
            return done(null, false, { message: 'geen gebruiker met dat email'})
        }

        try {
            if (await bcrypt.compare(password, user.password)){
                return done( null, user)
            }else {
                return done(null, false, { message: 'Wachtwoord is verkeerd'})
            }
        } catch(e) {
            return done(e)
        }
    }

passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => { 
    return done(null, getUserById(id))
})
}

module.exports = initialize
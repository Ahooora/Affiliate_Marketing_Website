const passport = require( 'passport' )
const expressSession = require( 'express-session' )
const LocalStrategy = require( 'passport-local' )
const { response } = require('express')

module.exports = app => {
    passport.serializeUser((user, done) => done(null, user.username))
    passport.deserializeUser((id, done) => {

        const user = {
            username: 'mmusterman',
            firstname: 'max',
            lastname: 'musterman',
        }
        done(null, user)
    })

    passport.use(
        new LocalStrategy((username, password, done) => {
            if( username === 'mmusterman' && password === 'test') {
                done(null, {
                    username: 'mmusterman',
                    firstname: 'max',
                    lastname: 'musterman',
                })
            } else {
                done('Not allowed')
            }
        })
    )

    app.use(
        expressSession({
            secret: 'xE§z6889?&fgqwe!23',
            resave: false,
            saveUninitialized: false,
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    app.post(
        '/login',
        passport.authenticate('local', { failureRedirect: '/public/login.html' }),
        (request, response) => {
            response.redirect('/')
        },

    )
}
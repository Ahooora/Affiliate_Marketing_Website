const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local')



module.exports = app => {

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((id, done) => {
        const user = {
            username: 'mmusterman',
            firstname: 'Max',
            lastname: 'Muster'
        }
        done(null, user)
    })

    passport.use(
        new LocalStrategy((username, password, done) => {


            if (username === 'mmusterman' && password === 'test') {
                done(null, {
                    username: 'mmusterman',
                    firstname: 'Max',
                    lastname: 'Muster'
                })
            } else {
                done(null, false)
            }

        })
    )


    app.use(expressSession({
        secret: '&3r/4gHjxx!oBQ',
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    //////////////////////////////////////////////////////
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/login.html')
    })

    //////////////////////////////////////////////////////



    app.post(
        '/login', passport.authenticate('local', {
            failureRedirect: '/login.html'
        }),
        (request, response) => { response.redirect('/success') }

    )
    app.get('/logout', (request, response) => {
        request.logout()
        response.redirect('/login.html')
    })
}
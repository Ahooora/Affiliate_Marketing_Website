const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local')
const express = require('express')
const { ensureLoggedIn } = require('connect-ensure-login')
const path = require('path');




const start = () => {
    const app = express()
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' == req.method) {
             res.sendStatus(200);
         } else {
             next();
         }
        });


    app.use( express.static ('public') )
    app.use( express.urlencoded ({ extended: false}))
    app.use( express.json())
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
            if (username === 'mmusterman' && password === 'test') {
                done(null, {
                    username: 'mmusterman',
                    firstname: 'max',
                    lastname: 'musterman',
                })
            } else {
                done(null, false)
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
        passport.authenticate('local', { failureRedirect: '/login' }),
        (request, response) => {
            
            response.send('U are logged in')
        }

    )

    app.get(
        '/login',
       
        (request, response) => {
            response.sendFile(path.join(__dirname, '/public/login.html'));
            
        }

    )

    app.get('/logout', (request, response) => {
        request.logout()
        response.redirect('/public/login.html')
    })

    app.get(
        '/',
        ensureLoggedIn('/login.html'),
        (req, res) => {
          res.redirect('./private/dashboard.html')  
          res.send(`Willkommen als angemeldeter User!`)
        }
      )

      
app.listen (5000, () => {
    console.log('Server is listening to http://localhost:5000')
})

}

start()
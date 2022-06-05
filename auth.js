const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local')
const User = require('./models/User')
const bodyParser = require('body-parser')
const express = require('express')
const bcrypt = require('bcryptjs')






module.exports = app => {

    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

    passport.use(new LocalStrategy(User.authenticate()))

    app.use(express.json())
    app.use(expressSession({
        secret: '&3r/4gHjxx!oBQ',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 2 * 60 * 1000
        }
    }))


    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(passport.initialize())
    app.use(passport.session())


    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/login.html')
    })


    app.post('/register', async (request, response) => {

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(request.body.password, salt, async (error, hash) => {
                if (error) throw error;
                try {
                    const newUser = await User.create({
                        username: request.body.username,
                        email: request.body.email,
                        password: hash

                    })
                    const savedUser = await newUser.save()
                    response.redirect(request.get('referer'))
                } catch (error) {
                    response.status(400).send(error)
                }
            })

        })
    })


    app.post(
        '/login', async (request, response) => {
            const user = await User.findOne({ email: request.body.username })
            if (!user) {
                response.status(401).send()
                return
            }
            bcrypt.compare(request.body.password, user.password, (error, match) => {
                if (error) throw error;
                if (!match) {
                    response.status(401).send()
                    return
                }
                request.login(user, error => {
                    if (error) {
                        response.redirect(request.get('referer'))
                        return
                    }
                    return response.redirect('/success');
                });

            })



        }
    )
    app.get('/logout', (request, response) => {
        request.logout()
        response.redirect('/login.html')
    })
}
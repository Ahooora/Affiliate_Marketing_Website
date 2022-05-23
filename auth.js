const passport = require('passport')
const expressSession = require('express-session')
const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = require('./models/User')
const bodyParser = require('body-parser')
const express = require('express')
const { request } = require('express')





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


    app.post('/register', async(request, response) => {
        try {
            const newUser = await User.create({
                username: request.body.username,
                email: request.body.email,
                password: request.body.password

            })
            const savedUser = await newUser.save()
            response.redirect(request.get('referer'))
        } catch (error) {
            response.status(400).send(error)
        }
    })


    app.post(
        '/login', async(request, response) => {
            const user = await User.findOne({ email: request.body.username })
            if (request.body.password !== user.password) {
                response.status(401)
                return
            }
            request.login(user, function(error) {
                if (error) {
                    response.redirect(request.get('referer'))
                    return
                }
                return response.redirect('/success');
            });

        }
    )
    app.get('/logout', (request, response) => {
        request.logout()
        response.redirect('/login.html')
    })
}
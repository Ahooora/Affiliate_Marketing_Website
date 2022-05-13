const auth = require('./auth')
const { ensureLoggedIn } = require('connect-ensure-login')
const express = require('express')
const app = express()

app.listen(5000, () => {
    console.log('Server is listening to http://localhost:5000')
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

auth(app)


app.use('/success', ensureLoggedIn('/login.html'))
app.use('/success', express.static('private'))
app.get('/success', (request, response) => {
    response.sendFile(__dirname + '/private/dashboard.html')
})
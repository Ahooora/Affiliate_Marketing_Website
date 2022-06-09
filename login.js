const auth = require('./auth')
const { ensureLoggedIn } = require('connect-ensure-login')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const companyModel = require('./models/Company')
const generateRandomId = require('./util/generateRandomId')

app.listen(5000, () => {
    console.log('Server is listening to http://localhost:5000')
})

const db = require('./config/key').MongoURI

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => console.log(error))


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

auth(app)


app.use('/success', ensureLoggedIn('/login.html'))
app.use('/success', express.static('private'))
app.get('/success', (request, response) => {
    response.sendFile(__dirname + '/private/dashboard.html')
})

app.post('/generate-link', async(request, response) => {
    if (!request.user) {
        response.redirect('/login.html')
        return
    }

    let company
    try {
        company = await companyModel.findOne({ userId: request.user._id, companyName: request.body.companyName })
        if (!company) {
            company = new companyModel({
                companyName: request.body.companyName,
                userId: request.user._id,
                link: `https://www.google.com/?q=${generateRandomId()}`,
                clicksNum: 0
            })
            await company.save()
        }

        company = await companyModel.findOneAndUpdate({ userId: request.user._id, companyName: request.body.companyName }, { $inc: { clicksNum: 1 } }, { new: true })

        response.send(company)
    } catch (error) {
        console.log(error)
    }
})
const auth = require('./auth')
const { ensureLoggedIn } = require('connect-ensure-login')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const companyLinksModel = require('./models/CompanyLinks')
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

app.post('/generate-link', ensureLoggedIn('/login.html'), async(request, response) => {
    if (!request.user) {
        response.redirect('/login.html')
        return
    }

    let company
    try {
        company = await companyLinksModel.findOne({ userId: request.user._id, companyId: request.body.companyId })
        if (!company) {
            company = new companyLinksModel({
                companyId: request.body.companyId,
                userId: request.user._id,
                link: `https://www.google.com/?q=${generateRandomId()}`,
                clicksNum: 0
            })
            await company.save()
            response.send(company)
            return
        }

        company = await companyLinksModel.findOneAndUpdate({ userId: request.user._id, companyId: request.body.companyId }, { $inc: { clicksNum: 1 } }, { new: true })
        response.send(company)
    } catch (error) {
        console.log(error)
    }
})

app.get('/companies', ensureLoggedIn('/login.html'), async(request, response) => {

        try {
            const companies = await companyModel.find()
            response.send(companies)

        } catch (error) {
            response.status(500).send(error)

        }
    }

)

app.get('/count-click', ensureLoggedIn('/login.html'), async(request, response) => {
    try {
        const companyLinks = await companyLinksModel.find({
            userId: request.user._id
        })
        const count = companyLinks.reduce((acc, companyLinks) => {
            acc += companyLinks.clicksNum
            return acc
        }, 0)
        response.send({ count })
    } catch (error) {
        response.status(500).send(error)
    }

})

app.get('/company-links', ensureLoggedIn('/login.html'), async(request, response) => {
    try {
        const companiesIds = await companyModel.find().select('_id')
        const companieLinks = await companyLinksModel.find({
            userId: request.user._id,
            companyId: { $in: companiesIds.map(companyId => companyId._id.toString()) }

        })
        response.send(companieLinks)
    } catch (error) {
        response.status(500).send(error)
    }
})
const auth = require('./auth')
const { ensureLoggedIn } = require('connect-ensure-login')
const express = require('express')
const app = express()
const mongoose = require('mongoose')


const GenerateLinkController = require('./controllers/GenerateLinkController')
const CountClicksController = require('./controllers/CountClicksController')
const GetCompanyController = require('./controllers/GetCompanyController')
const CreateCompanyController = require('./controllers/CreateCompanyController')
const TotalIncomeController = require('./controllers/TotalIncomeController')


    async function startServer() {

        // Database configuration
        const db = require('./config/key').MongoURI
        const connectionResult = await mongoose.connect(db, { useNewUrlParser: true })
        if (connectionResult.connection.readyState === 1) {
            console.log('MongoDB is connected')
        } else {
            throw new Error('MongoDB is not connected')
        }


        // Routes
        app.use(express.static('public'))
        app.use(express.urlencoded({ extended: false }))

        auth(app)

        app.use('/success', ensureLoggedIn('/login.html'))
        app.use('/success', express.static('private'))
        app.get('/success', (request, response) => {
            response.sendFile(__dirname + '/private/dashboard.html')
        })

        // Create a new company
        app.get('/companies', ensureLoggedIn('/login.html'), CreateCompanyController)

        // Get company links
        app.get('/company-links', ensureLoggedIn('/login.html'), GetCompanyController)

        // Count the clicks
        app.get('/count-click', ensureLoggedIn('/login.html'), CountClicksController)

        // Generate a random link
        app.post('/generate-link', ensureLoggedIn('/login.html'), GenerateLinkController)

        // Get total income
        app.get('/total-income', ensureLoggedIn('/login.html'), TotalIncomeController)

        
        // Server configuration
        app.listen(5000, () => {
            console.log('Server is listening to http://localhost:5000')
        })
    }
    startServer()

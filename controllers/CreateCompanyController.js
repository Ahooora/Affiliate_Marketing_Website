const companyModel = require('../models/Company')


const CreateCompanyController =  async (request, response) => {

    try {
        const companies = await companyModel.find()
        response.send(companies)

    } catch (error) {
        response.status(500).send(error)

    }
}
module.exports = CreateCompanyController
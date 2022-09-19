const companyModel = require('../models/Company')
const companyLinksModel = require('../models/CompanyLinks')

const TotalIncomeController = async (request, response) => {
    try {
        const companies = await companyModel.find()
        const companyLinks = await companyLinksModel.find({
            userId: request.user._id,
        })
        
        const totalPrice = companies.reduce((acc, company) => {
            const OneCompanyLink = companyLinks.find((singleCompanyLink) => singleCompanyLink.companyId._id.toString() === company._id.toString())

            acc += (company.pricePerClick * OneCompanyLink?.clicksNum || 0)
           
            return acc
        }, 0)
        
        const totalClicksPerUser = companyLinks.reduce((acc, companyLink) => {
            acc += companyLink?.clicksNum || 0
            return acc
        }, 0)
        
        response.send({ totalIncomePerUser: (totalPrice / 100).toFixed(2) })


    }

    catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
}

module.exports = TotalIncomeController

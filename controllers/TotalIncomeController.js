const companyModel = require('../models/Company')
const companyLinksModel = require('../models/CompanyLinks')

const TotalIncomeController = async (request, response) => {
    try {
        const companies = await companyModel.find()
        
        const totalPrice = companies.reduce((acc, company) => {
            
            acc += company.pricePerClick
            
            return acc
        },0)
         const companyLinks = await companyLinksModel.find({
            userId: request.user._id
        })
        const totalClicksPerUser = companyLinks.reduce((acc, company) => {
            
            acc += company.clicksNum * (companies.find(company => company._id.toString() === company.companyId)?.pricePerClick||0)/100
            
            return acc
        },0)
        
        response.send( {totalIncomePerUser: ((totalPrice/100) * totalClicksPerUser).toFixed(2)} )
       

    }

    catch (error) {
        response.status(500).send(error)
    }
}

module.exports = TotalIncomeController
const companyLinksModel = require('../models/CompanyLinks')


const CountClicksController = async (request, response) => {

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
}

module.exports = CountClicksController

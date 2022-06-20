const companyLinksModel = require('../models/CompanyLinks')
const crypto = require('crypto')


const GenerateLinkController =  async (request, response) => {
    if (!request.user) {
        console.log(response)
        response.redirect('../login.html')
        return
    }

    let company
    try {
        company = await companyLinksModel.findOne({ userId: request.user._id, companyId: request.body.companyId })
        if (!company) {
            company = new companyLinksModel({
                companyId: request.body.companyId,
                userId: request.user._id,
                link: `https://www.google.com/?q=${crypto.randomUUID().slice(-10)}`,
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
}

module.exports = GenerateLinkController

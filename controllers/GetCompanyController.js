const companyLinksModel = require('../models/CompanyLinks');
const companyModel = require('../models/Company');

const GetCompanyController = async (request, response) => {
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
}

module.exports = GetCompanyController
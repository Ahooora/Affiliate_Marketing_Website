const mongoose = require("mongoose")

const CompanyLinksSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        rel: "Company"

    },
    clicksNum: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }
})
CompanyLinksSchema.index({ link: 1 }, { unique: true })


module.exports =  mongoose.model("CompanyLinks", CompanyLinksSchema)
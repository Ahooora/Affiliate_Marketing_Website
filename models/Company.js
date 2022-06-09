const mongoose = require("mongoose")
const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true

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
CompanySchema.index({ link: 1 }, { unique: true })


module.exports = mongoose.model("Company", CompanySchema)
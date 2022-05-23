const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true

    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

});
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
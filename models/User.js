const mongoose = require("mongoose");
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

module.exports = mongoose.model("Users", userSchema)
    
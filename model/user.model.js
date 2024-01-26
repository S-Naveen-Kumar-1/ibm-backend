const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    avatar: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
},
    { versionKey: false }
)
const UserModel = mongoose.model("user", userSchema)
module.exports = { UserModel }
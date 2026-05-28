const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please add user name"]
    },

    email: {
        type: String,
        required: [true, "Please add user email address"],
        unique: [true, "Email address already taken"]
    },

    password: {
        type: String,
        required: [true, "Please add password"]
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
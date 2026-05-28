// models/bookModel.js

const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    totalCopies: {
        type: Number,
        required: true
    },

    availableCopies: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    borrowedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);
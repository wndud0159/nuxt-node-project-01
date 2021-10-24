const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Board = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = Board;

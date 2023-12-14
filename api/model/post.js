const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
    },
    picturePath: {
        type: String,
    },
    category: {
        type: String,
    },
    comments: [
        {
            text: {
                type: String,
            },
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    picturePath: {
        type: String,
        default: '../img/profile.png',
    },
    role: {
        type: String,
        default: 'user',
    },
    otp: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);

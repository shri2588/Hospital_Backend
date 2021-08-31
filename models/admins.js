const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminsSchema = new Schema({

    adminId: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Admins', adminsSchema);
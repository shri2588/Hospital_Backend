const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({

    hospitalName: {
        type: String,
        required: true
    },

    hospitalRegistrationNo: {
        type: String,
        required: true
    },

    hospitalType: {
        type: String,
        required: true
    },

    government: {
        type: String,
        required: true
    },
    
    address: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    district: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    website: {
        type: String
    },

    lognitude: {
        type: String,
        required: true
    },

    latitude: {
        type: String,
        required: true
    },

    ownerName: {
        type: String,
        required: true
    },

    ownerContactNo: {
        type: String,
        required: true
    },

    ownerEmail: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('HospitalModel', hospitalSchema);
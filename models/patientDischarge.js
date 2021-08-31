const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientDischargeSchema = new Schema({
   

    
    hospitalId:{
        type: Schema.Types.ObjectId,
    },

    bedId:{
        type: Schema.Types.ObjectId,
    },
   
    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    aadharNo: {
        type: String,
        required: true
    },

    contactNo: {
        type: String,
        required: true
    },

   email: {
        type: String,
        required: true
    },

   dob: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    marital: {
        type: String,
        required: true
    },

    disease: {
        type: String,
        required: true
    },

    age: {
        type: Number,
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

    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },

    ward: {
        type: String
    },

    bedtype: {
        type: String,
        required: true
    },

   
});

module.exports = mongoose.model('PatientDischarge', patientDischargeSchema);
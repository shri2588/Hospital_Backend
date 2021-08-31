const mongoose = require('mongoose');
var ttl = require('mongoose-ttl');
const Schema = mongoose.Schema;

const tempUserSchema = new Schema({
    
    hospitalId:{
        type: Schema.Types.ObjectId,
    },

    UserName: {
        type: String,
        required: true
    },

    PatientName: {
        type: String,
        required: true
    },

    UserContect: {
        type: String,
        required: true
    },

    UserAadhar: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

});
tempUserSchema.plugin(ttl, { ttl: 3000000 });

module.exports = mongoose.model('TempUser', tempUserSchema);
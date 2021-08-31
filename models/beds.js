const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bedSchema = new Schema({

    hospitalId:{
        type: Schema.Types.ObjectId,
    },

    privateBeds: {
        type: Number,
        required: true
    },

    generalBeds: {
        type: Number,
        required: true
    },

    wardsName: {
        type: String,
        required:true
    },


});

module.exports = mongoose.model('Beds', bedSchema);
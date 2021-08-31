const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wardSchema = new Schema({

    hospitalId:{
        type: Schema.Types.ObjectId,
    },
    
    wardsName: {
        type: String,
        required: true
    },

    wardNo: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Wards', wardSchema);
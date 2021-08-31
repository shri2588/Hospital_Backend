const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({

    hospitalId:{
        type: Schema.Types.ObjectId,
    },
    
    docName: {
        type: String,
        required: true
    },

    docReg: {
        type: String,
        required: true
    },

    docSp: {
        type: String,
        required: true
    },

    docWard: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Doctors', doctorSchema);
const mongoose = require('mongoose');
var ttl = require('mongoose-ttl');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
});

userSchema.plugin(ttl, { ttl: 120000 });

module.exports = mongoose.model('User', userSchema);
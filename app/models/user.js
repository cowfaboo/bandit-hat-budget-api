var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
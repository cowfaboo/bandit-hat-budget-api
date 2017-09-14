var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    group: { type: mongoose.Schema.ObjectId, ref: 'Group', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
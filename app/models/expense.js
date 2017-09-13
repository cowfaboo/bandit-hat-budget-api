var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: Date,
    amount: Number,
    category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    group: { type: mongoose.Schema.ObjectId, ref: 'Group', required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);
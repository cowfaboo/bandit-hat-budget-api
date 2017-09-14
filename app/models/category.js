var mongoose = require('mongoose');
var Expense = require('./expense');

var categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    monthlyBudget: { type: Number, min: 0 },
    color: { type: String, required: true },
    group: { type: mongoose.Schema.ObjectId, ref: 'Group', required: true }
}, {
    timestamps: true
});

categorySchema.pre('remove', function (next) {
  
    var query = Expense.find().where('category').equals(mongoose.Types.ObjectId(this._id));
    query.exec( function (err, expenses) {
        if (!err) {
            expenses.forEach(function(expense) {
                expense.category = null;
                expense.save(function(err) {});
            }, this);
        }
        next();
    });
});

module.exports = mongoose.model('Category', categorySchema);
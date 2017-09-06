var express = require('express');
var router = express.Router();
var Expense = require('../models/expense');
var Category = require('../models/category');
var User = require ('../models/user');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 


module.exports = function(app) {

    app.use('/expense', router);

    // GET
    router.get('/', (req, res) => {

        var categoryID = req.query.category_id;
        var userID = req.query.user_id;
        var startDate = req.query.start_date;
        var endDate = req.query.end_date;
        var page = req.query.page;
        var perPage = req.query.per_page;

        var query = Expense.find();

        if (categoryID) {
            query = query.where('category').equals(ObjectId(categoryID));
        }

        if (userID) {
            query = query.where('user').equals(ObjectId(userID));
        }

        if (startDate && endDate) {
            query = query.where('createdAt').gte(new Date(startDate)).lte(new Date(endDate));
        }

        if (page && perPage) {
            pageInt = parseInt(page);
            perPageInt = parseInt(perPage);
            query = query.limit(perPageInt).skip(perPageInt * pageInt);
        }

        query.exec( (err, expenses) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!expenses) {
                    res.status(404);
                }
                res.json(expenses);
            }
        });
    });

    // GET amount
    router.get('/amount', (req, res) => {
        
        var categoryID = req.query.category_id;
        var userID = req.query.user_id;
        var startDate = req.query.start_date;
        var endDate = req.query.end_date;

        var aggregateMatch = { $match: {
            
        } };

        var aggregateGroup = { $group: {
            _id: { 

                },
            amount: { $sum: '$amount'}
        } };

        var aggregateProjection = { $project: {
            _id: 0,
            amount: 1,
            category_id: 1,
            user_id: 1
        } };

        var aggregateFieldAddition = { $addFields: {
            start_date: startDate,
            end_date: endDate
        } };

        var aggregateArray = [aggregateMatch, aggregateGroup, aggregateProjection, aggregateFieldAddition];
        if (startDate & endDate) {
            aggregateMatch.$match.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        if (categoryID == 'all' && userID == 'all') {

            aggregateGroup.$group.category_id = { '$first': '$category' };
            aggregateGroup.$group._id.category_id = '$category';
            aggregateGroup.$group.user_id = { '$first': '$user' };
            aggregateGroup.$group._id.user_id = '$user';

            Expense.aggregate(aggregateArray, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });

        } else if (categoryID == 'all') {

            aggregateGroup.$group.category_id = { '$first': '$category' };
            aggregateGroup.$group._id.category_id = '$category';
            if (userID) {
                aggregateMatch.$match.user = ObjectId(userID);
                aggregateFieldAddition.$addFields.user_id = userID;
            }

            Expense.aggregate(aggregateArray, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });

        } else if (userID == 'all') {
           
            aggregateGroup.$group.user_id = { '$first': '$user' };
            aggregateGroup.$group._id.user_id = '$user';
            if (categoryID) {
                aggregateMatch.$match.category = ObjectId(categoryID);
                aggregateFieldAddition.$addFields.category_id = categoryID;
            }

            Expense.aggregate(aggregateArray, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });

        } else {

            if (categoryID) {
                aggregateMatch.$match.category = ObjectId(categoryID);
                aggregateFieldAddition.$addFields.category_id = categoryID;
            }

            if (userID) {
                aggregateMatch.$match.user = ObjectId(userID);
                aggregateFieldAddition.$addFields.user_id = userID;
            }

            Expense.aggregate(aggregateArray, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });
        }
    });

    // GET id
    router.get('/:id', (req, res) => {

        Expense.findById(req.params.id, (err, expense) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!expense) {
                    res.status(404);
                }
                res.json(expense);
            }
        });
    });

    // POST
	router.post('/', (req, res) => {

        var expense = new Expense();
        expense.name = req.body.name;
        expense.amount = req.body.amount;
        expense.user = ObjectId(req.body.user_id);
        expense.category = ObjectId(req.body.category_id);
        expense.date = new Date(req.body.date);
        
        expense.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(expense);
            }
        });
    });

    // PATCH id
    router.patch('/:id', (req, res) => {
        Expense.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, expense) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!expense) {
                    res.status(404);
                }
                res.json(expense);
            }
        });
    });

    // DELETE id
    router.delete('/:id', (req, res) => {
        Expense.findByIdAndRemove(req.params.id, (err, expense) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!expense) {
                    res.status(404);
                }
                res.json(expense);
            }
        });
    });
};
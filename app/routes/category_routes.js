var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Category = require('../models/category');
var mongoose = require('mongoose');
var auth = require('./auth');


module.exports = function(app) {

    app.use('/category', router);
    // GET
    router.get('/', auth.isAuthenticated, (req, res) => {

        var groupID = req.user._id;

        Category.find({group: groupID}, (err, categories) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(categories);
            }
        });
    });

    // GET id
    router.get('/:id', auth.isAuthenticated, (req, res) => {

        var groupID = req.user._id;

        Category.find({group: groupID, _id: req.params.id}, (err, category) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!category) {
                    res.status(404);
                }
                res.json(category);
            }
        });
    });

    // POST
	router.post('/', auth.isAuthenticated, (req, res) => {

        var category = new Category();
        category.name = req.body.name;
        category.description = req.body.description;
        category.monthlyBudget = req.body.monthlyBudget;
        category.color = req.body.color;
        category.group = req.user._id;
        
        category.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(category);
            }
        });
    });

    // PATCH id
    router.patch('/:id', auth.isAuthenticated, (req, res) => {
        
        var groupID = req.user._id;

        Category.findOneAndUpdate({group: groupID, _id: req.params.id}, {$set: req.body}, {new: true}, (err, category) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!category) {
                    res.status(404);
                }
                res.json(category);
            }
        });
    });

    // DELETE id
    router.delete('/:id', auth.isAuthenticated, (req, res) => {
        
        var groupID = req.user._id;

        Category.findOneAndRemove({group: groupID, _id: req.params.id}, (err, category) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!category) {
                    res.status(404);
                }

                res.json(category);
            }
        });
    });
};
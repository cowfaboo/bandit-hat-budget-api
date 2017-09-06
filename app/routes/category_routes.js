var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Category = require('../models/category');
var mongoose = require('mongoose');


module.exports = function(app) {

    app.use('/category', router);

    // GET
    router.get('/', (req, res) => {

        Category.find((err, categories) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(categories);
            }
        });
    });

    // GET id
    router.get('/:id', (req, res) => {

        Category.findById(req.params.id, (err, category) => {
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
	router.post('/', (req, res) => {

        var category = new Category();
        category.name = req.body.name;
        category.description = req.body.description;
        category.monthly_budget = req.body.monthly_budget;
        category.color = req.body.color;
        
        category.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(category);
            }
        });
    });

    // PATCH id
    router.patch('/:id', (req, res) => {
        Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, category) => {
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
    router.delete('/:id', (req, res) => {
            Category.findOne( {_id: req.params.id}, (err, category) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!category) {
                    res.status(404);
                } else {
                    category.remove();
                }
                res.json(category);
            }
        });
    });
};
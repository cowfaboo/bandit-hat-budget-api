var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/user');
var mongoose = require('mongoose');


module.exports = function(app) {

    app.use('/user', router);

    // GET
    router.get('/', (req, res) => {

        User.find((err, users) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(users);
            }
        });
    });

    // GET id
    router.get('/:id', (req, res) => {

        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!user) {
                    res.status(404);
                }
                res.json(user);
            }
        });
    });

    // POST
	router.post('/', (req, res) => {

        var user = new User();
        user.name = req.body.name;
        
        user.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    });

    // PATCH id
    router.patch('/:id', (req, res) => {
        User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!user) {
                res.status(404);
                }
                res.json(user);
            }
        });
    });

    // DELETE id
    router.delete('/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!user) {
                    res.status(404);
                }
                res.json(user);
            }
        });
    });
};
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var User = require('../models/user');
var mongoose = require('mongoose');
var auth = require('./auth');


module.exports = function(app) {

    app.use('/user', router);

    // GET
    router.get('/', auth.isAuthenticated, (req, res) => {

        var groupID = req.user._id;

        User.find({ group: groupID}, (err, users) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(users);
            }
        });
    });

    // GET id
    router.get('/:id', auth.isAuthenticated, (req, res) => {

        var groupID = req.user._id;

        User.findOne({group: groupID, _id: req.params.id}, (err, user) => {
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
	router.post('/', auth.isAuthenticated, (req, res) => {

        var user = new User();
        user.name = req.body.name;
        user.group = req.user._id;
        
        user.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        });
    });

    // PATCH id
    router.patch('/:id', auth.isAuthenticated, (req, res) => {

        var groupID = req.user._id;

        User.findOneAndUpdate({group: groupID, _id: req.params.id}, {$set: req.body}, {new: true}, (err, user) => {
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
    router.delete('/:id', auth.isAuthenticated, (req, res) => {

        var groupID = req.user._id;

        User.findOneAndRemove({group: groupID, _id: req.params.id}, (err, user) => {
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
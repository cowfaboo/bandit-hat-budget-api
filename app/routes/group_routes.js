var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Group = require('../models/group');
var mongoose = require('mongoose');
var auth = require('./auth');


module.exports = function(app) {

    app.use('/group', router);

    // GET
    router.get('/', auth.isAuthenticated, (req, res) => {
        
        Group.find((err, groups) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(groups);
            }
        });
    });

    // GET signin
    router.get('/signin', auth.isAuthenticated, (req, res) => {
        
        Group.findById(req.user._id, (err, group) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (!group) {
                    res.status(404);
                }
                res.json(group);
            }
        });
    });

    // POST
	router.post('/', (req, res) => {

        var group = new Group({
            name: req.body.name,
            lowercaseName: req.body.name.toLowerCase(),
            password: req.body.password
        });
        
        group.save(function(err) {
            if (err) {
                if (err.code == 11000) {
                    err['customErrorMessage'] = 'That household name already exists. Try something else!';
                }
                res.status(500).send(err);
            } else {
                res.json(group);
            }
        });
    });
};
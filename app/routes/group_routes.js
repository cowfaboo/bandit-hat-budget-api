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

    // POST
	router.post('/', (req, res) => {

        var group = new Group({
            name: req.body.name,
            password: req.body.password
        });
        
        group.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(group);
            }
        });
    });
};
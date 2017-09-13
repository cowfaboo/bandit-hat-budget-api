// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Group = require('../models/group');

passport.use(new BasicStrategy(function(name, password, callback) {
        
    Group.findOne({ name: name }, function (err, group) {
        if (err) { 
            return callback(err); 
        }

        // No user found with that username
        if (!group) { 
            return callback(null, false); 
        }

        // Make sure the password is correct
        group.verifyPassword(password, function(err, isMatch) {
            if (err) { 
                return callback(err); 
            }

            // Password did not match
            if (!isMatch) { 
                return callback(null, false); 
            }

            // Success
            return callback(null, group);
        });
    });
}));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
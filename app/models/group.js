var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

groupSchema.pre('save', function(callback) {
    var group = this;

    // Break out if the password hasn't changed
    if (!group.isModified('password')) {
        return callback();
    }

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(group.password, salt, null, function(err, hash) {
            if (err) {
                return callback(err);
            }

            group.password = hash;
            callback();
        })
    })
})

groupSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        } else {
            callback(null, isMatch);
        }
    });
};

groupSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    return obj
  }

module.exports = mongoose.model('Group', groupSchema);
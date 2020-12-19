var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var mongoosePaginate = require('mongoose-paginate');


var UserSchema = new mongoose.Schema({
    email: {type: String, default: ''},
    password: String,
    phone: {type: String},
    role: {type: String, default: ''},
    firstname: {type: String, default: ''},
    lastname: {type: String, default: ''},
    structure: [
        {
            name :{type: String},
            adresse : {type: String},
            phone: {type: String}
        } 
    ]
    
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', UserSchema);


module.exports = User;

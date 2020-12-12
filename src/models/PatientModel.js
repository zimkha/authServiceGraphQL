var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var mongoosePaginate = require('mongoose-paginate');


var PatientSchema = new mongoose.Schema({
    email: {type: String, default: ''},
    password: String,
    phone: {type: String, unique: true},
    name: {type: String, default: ''},
    // gender: {type: String, default: ''},
    // dob: {type: Date},
    // picture: {type: String, default: ''},
    // isEmailVerified: Boolean,
    // status: {type: String, default: "active"},
    // mobileVerificationOTP: String,
    // mobileVerificationExpires: Date,
    // isMobileVerified: Boolean,
    // passwordResetToken: String,
    // passwordResetExpires: Date,
    // deviceTokens: [{fcm: String, platform: String}],

  

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

/**
 * Password hash middleware.
 */
PatientSchema.pre('save', function (next) {
    var patient = this;
    if (!patient.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(patient.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            patient.password = hash;
            next();
        });
    });
});

PatientSchema.plugin(mongoosePaginate);

var Patient = mongoose.model('Patient', PatientSchema);


module.exports = Patient;

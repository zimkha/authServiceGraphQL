const GraphQL = require('graphql');
var validator = require('validator');

const auth = require('../../config/auth');
const option = require('../../config/options');
const Generic = require('../types/GenericType');
const { verifyNumber } = require('../../config/checkNumber');

const {
    GraphQLNonNull,
    GraphQLString,
} = GraphQL;

const PatientType = require('../types/PatientType');
const PatientResolver = require('../resolvers/Patient');

module.exports = {
   login() {
        return {
            type: PatientType,
            description: 'Login a Patient',
            args: {
                phone: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Mobile number cannot be left empty',
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter password, will be automatically hashed',
                }
            },
            resolve(root, fields) {
               return PatientResolver.authenticate(fields);
            }
        }
    },
    create(){
        return {
            type: PatientType,
            description: 'add new Patient',
            args: {
                phone: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Mobile number cannot be left empty',
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'email cannot be left empty',
                },

                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter password, will be automatically hashed',
                }
            },
            resolve(root, fields) {
                if(verifyNumber(fields.mobileNumber)){
                    throw new Error("Invalid mobile number!");
                }

                if (!validator.isLength(fields.password, {min: option.minPasswordLength, max: undefined})) {
                    throw new Error("Your password should be greater then " + option.minPasswordLength + " characters!");
                }
               return PatientResolver.create(fields);
            }
        }
    },
    resetPasswordPatient(){
        return {
            type: UserType,
            args: {
                phone: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Mobile number cannot be left empty',
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter password, will be automatically hashed',
                }
            }
        }
    },
}
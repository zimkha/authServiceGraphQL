const GraphQL = require('graphql');
var validator = require('validator');

const auth = require('../../config/auth');
const option = require('../../config/options');
const Generic = require('../types/GenericType');


const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = GraphQL;

const UserType = require('../types/StructureUserType');
const UserResolver = require('../resolvers/UserStructure');

module.exports = {
   login() {
        return {
            type: UserType,
            description: 'Login a user',
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
            resolve(parent, fields) {
               return UserResolver.authenticate(fields);
            }
        }
    },
    create(){
        return {
            type: UserType,
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
            resolve(parent, fields) {
                if (!validator.isLength(fields.password, {min: option.minPasswordLength, max: undefined})) {
                    throw new Error("Your password should be greater then " + option.minPasswordLength + " characters!");
                }
                if (!validator.isMobilePhone(fields.mobileNumber, option.mobileNumberLocale)) {
                    throw new Error("Invalid mobile number!");
                }

               
               return UserResolver.create(fields);
            }
        }
    }
}
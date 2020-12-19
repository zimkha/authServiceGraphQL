const GraphQL = require('graphql');
var validator = require('validator');

const option = require('../../config/options');


const {
    GraphQLNonNull,
    GraphQLString,
} = GraphQL;

const UserType = require('../types/StructureUserType');
const UserResolver = require('../resolvers/UserStructure');
const PatientType = require('../types/PatientType');

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
            resolve(root, fields) {
               return UserResolver.authenticate(fields);
            }
        }
    },
    create(){
        return {
            type: UserType,
            description: 'add new user',
            args: {
                phone: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Mobile number cannot be left empty',
                },
                email: {
                    type: GraphQLString,
                    description: 'email cannot be left empty',
                },

                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter password, will be automatically hashed',
                },
                role : {
                    type: GraphQLString,
                    description: 'role of user',
                }
            },
            resolve(root, fields) {
                if (!validator.isLength(fields.password, {min: option.minPasswordLength, max: undefined})) {
                    throw new Error("Your password should be greater then " + option.minPasswordLength + " characters!");
                }
               
               return UserResolver.create(fields);
            }
        }
    },
  
    resetPasswordUser(){
        return {
            type: PatientType,
            args : {
                phone: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Mobile number cannot be left empty',
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter password, will be automatically hashed',
                }
            },
            resolve(root, fields){
                if (!validator.isLength(fields.password, {min: option.minPasswordLength, max: undefined})) {
                    throw new Error("Your password should be greater then " + option.minPasswordLength + " characters!");
                }
                
            }
            }
        }
    }

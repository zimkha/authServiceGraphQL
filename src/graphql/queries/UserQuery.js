const GraphQL = require('graphql');
const auth = require('../../config/auth');

const {
    GraphQLList,
} = GraphQL;


const PatientType = require('../types/PatientType');
const PatientResolver = require('../resolvers/Patient');

const UserType = require('../types/StructureUserType');
const UserResolver = require('../resolvers/UserStructure');

module.exports = {
    patients() {
        return {
            type: new GraphQLList(PatientType),
            resolve: (parent, args, context, info) => {
                return PatientResolver.allPatients({});
                 }
        }
    },
    users(){
        return {
            type: new GraphQLList(UserType),
            resolve: (parent, args, context, info) => {
                return UserResolver.all({});
                 }
        }
    },
    singlePatient() {
        return {
            type :   PatientType,
                description: '',
                resolve : (parent, args, context , info) => {
                    return PatientType.getOne(args.id)
                }
        }
    },
    singleUser() {
        return {
            type :   UserType,
                description: '',
                resolve : (parent, args, context , info) => {
                    return UserResolver.getOne(args.id)
                }
        }
    }
}


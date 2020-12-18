const GraphQL = require('graphql');
const auth = require('../../config/auth');

const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema
} = GraphQL;


const PatientType = require('../types/PatientType');
const PatientResolver = require('../resolvers/Patient');

const UserType = require('../types/StructureUserType');
const UserResolver = require('../resolvers/UserStructure');


// let schema = new GraphQLSchema({
   const Userquery = new GraphQLObjectType({
        name : 'RoutQuery',
        fields: () => ({
            patients: {
                type: new GraphQLList(PatientType),
                description : 'all patients',
                resolve: (parent, args, context, info) => {
                    return PatientResolver.allPatients({});
                }
            },
            users: {
                type: new GraphQLList(UserType),
                description : 'all users or patients',
                resolve: (parent, args, context, info) => {
                    return UserResolver.allPatients({});
                }
            },
            singleUser: {
                type : UserType,
                description: '',
                resolve : (parent, args, context , info) => {
                    return UserResolver.getOne(args.id)
                }
            },
            singlePatient : {
                type : PatientType,
                description: '',
                resolve : (parent, args, context , info) => {
                    return PatientResolver.getOne(args.id)
                }
            }
         
        })
    });
 
// });

module.exports = Userquery


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
        allPatient() {
            return {
                    type: new GraphQLList(PatientType),
                    description: 'This will return all the patients present in the database',
                    resolve(parent, args, context, info) {
                        return PatientResolver.allPatients({});
                    }
                
            }
        },
        allUser(){
            return {
                type: new GraphQLList(UserType),
                resolve(parent, args, context, info){
                     return UserResolver.all();
                }
            }
        },

        SingleUser(){
            return {
                type : UserType,
                resolve(parent, args, context , info){
                    return UserResolver.getOne(args.id);
                }
            }
        },

        SinglePatient(){
            return {
                    type : PatientType,
                    resolve(parent, args, context , info){
                        return PatientResolver.getOne(args.id);
                    }
            }
        },
       

};
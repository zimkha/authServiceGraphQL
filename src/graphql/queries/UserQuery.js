const GraphQL = require('graphql');
const auth = require('../../config/auth');

const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;


const PatientType = require('../types/PatientType');
const PatientResolver = require('../resolvers/Patient');


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
        allDoctor(){
            return {

            }
        },

        SingleDoctor(){
            return {

            }
        },

        SinglePatient(){
            return {

            }
        },
       

};
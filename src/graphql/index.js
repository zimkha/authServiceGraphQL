const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema
} = GraphQL;

const UserMutation = require('./mutations/PatientMutations')
const UserQuery    = require('../graphql/queries/UserQuery')
const StructureMutation = require('../graphql/mutations/StructureMutation');

const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	description : '',
	fields : {
	   patients : UserQuery.patients(),
	   patient : UserQuery.singlePatient(),

	   users :   UserQuery.users(),
	   user  :   UserQuery.singleUser()
	}
});


const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
	 loginPatient : UserMutation.login(),
	 loginUser  : StructureMutation.login(),

	 addPatient : UserMutation.create(),
	 addUser    : StructureMutation.create()
	}
});


module.exports = new GraphQLSchema({
	query:    RootQuery,
	mutation: RootMutation
})

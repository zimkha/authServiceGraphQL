const GraphQL = require('graphql');
const {
	GraphQLObjectType
} = GraphQL;

const UserMutation = require('../graphql/mutations/UserMutations')
const UserQuery    = require('../graphql/queries/UserQuery')
const StructureMutation = require('../graphql/mutations/StructureMutation');

const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	description : '',
	fields : {
	   patients : UserQuery.patients,
	}
});


const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
	 loginPatient : UserMutation.login(),
	//  createPatient: UserMutation.create(),
	//  loginUser    : StructureMutation.login(),
	//  createUser   : StructureMutation.create()
	}
});

module.exports = {
	query:    RootQuery,
	mutation: RootMutation
}
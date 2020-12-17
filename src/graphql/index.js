const GraphQL = require('graphql');
const {
	GraphQLObjectType
} = GraphQL;

const PatientQuery = require('../graphql/queries/UserQuery');
const UserMutation = require('../graphql/mutations/UserMutations')

const RootQuery = new GraphQLObjectType({
	name : 'RootQueryType',
	description : '',
	fields : {
       patients : PatientQuery.allPatient
	}
});


const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
	 login : UserMutation.login,
	 create: UserMutation.create
	}
});

module.exports = {
	query:    RootQuery,
	mutation: RootMutation
}
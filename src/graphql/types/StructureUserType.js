const GraphQL = require('graphql');
const {
	GraphQLString,
	GraphQLID,
	GraphQLObjectType,
	GraphQLList
} = GraphQL;


const StructureUserType = new GraphQLObjectType({
    name: 'UserStructure',
	description: 'Patient type for managing all the patients in our application.',

	fields: () => ({
		
		id: {
			type: GraphQLID,
			description: 'ID of the patient, Generated automatically by MongoDB',
        },
        email: {
			type: GraphQLString,
			description: 'Email address of the patient, must be valid and unique',
		},
		phone: {
			type: GraphQLString,
			description: 'Full name of the patient',
		},
        password: {
			type: GraphQLString,
			description: 'Gender of the patient',
        },
        role : {
			type : GraphQLString,
		},
		createdAt: {
			type: GraphQLString,
			description: 'Generate system to allow patient to have secure resource access',
		},
		updatedAt: {
			type: GraphQLString,
			description: 'Date and time when this patient account was last updated',
		}

	})
});

module.exports = StructureUserType;
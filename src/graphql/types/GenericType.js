const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = GraphQL;


exports.messageOutputType = new GraphQLObjectType({
    name: 'messageOutput',
    description: 'Send success message',
    fields: () => ({
        message: {
            type: GraphQLString,
            description: 'Success message string',
        },
    })
});
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const schema = require('./graphql/index')
const mongoose = require('mongoose');
const  graphqlHTTP  = require('express-graphql');

const app = express();

const uri =  "mongodb://localhost:27017/serviceauthfd";
mongoose.connect(uri, {  useMongoClient: true, }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    });
mongoose.set('debug', true);
dotenv.load({path: '.env'});


app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/graphql', graphqlHTTP({
    schema : schema.query,
    rootValue : schema.mutation,
    graphiql: true,
    pretty: true,
  }));
  

app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;


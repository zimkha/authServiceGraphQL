const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const schema = require('./graphql/index')
const mongoose = require('mongoose');
const  graphqlHTTP  = require('express-graphql');
const cors = require('cors')
const app = express();
app.use(cors())
// Connexion a MongoDB
const uri =  "mongodb://localhost:27017/serviceauthfd";
mongoose.connect(uri, {  useMongoClient: true, }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    });
mongoose.set('debug', true);
// End 
dotenv.load({path: '.env'});


app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 5000}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/graphql', graphqlHTTP({
    schema : schema,
    graphiql: true,
    pretty: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }));
 
  

app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;


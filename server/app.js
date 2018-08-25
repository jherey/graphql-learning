import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './schema/schema';

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://jerry:password1@ds145302.mlab.com:45302/gql-jerry');
mongoose.connection.once('open', () => {
  console.log('Connected to database');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
})
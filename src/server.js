import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';

import schema from './schema';
const PORT = 3000;

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
}));

app.listen(PORT);
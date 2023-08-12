const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const port = 4000;

const schema = buildSchema(`
type Query{
    hello: String
}`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
const {ApolloServer}=require("apollo-server");
const { db } = require("./db");
const { typeDefs } = require("./schema");
const {Query}=require("./resolvers/Query")
const {Tweet}=require("./resolvers/Tweet")
const {Mutation}=require("./resolvers/Mutation")
const { gql } = require("apollo-server");
const server=new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Mutation,
        Tweet
    },
    context:{
       db
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  }); 

const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Tweet } = require("./resolvers/Tweet");
const { ApolloServer } = require("apollo-server");
const { db } = require("./db");

describe("testing graphql queries", () => {
  let testServer;
  beforeAll(async () => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers: {
        Query,
        Mutation,
        Tweet,
      },
      context: {
        db,
      },
    });
  });
  it("tweet by id", async () => {
    const GET_TWEETS = `
    query($tweetId: ID!) {
    tweet(id: $tweetId) {
        id
    }
  }`;
    const result = await testServer.executeOperation({
      query: GET_TWEETS,
      variables: { tweetId: 1 },
    });
    expect(result.data.tweet.id).toBe("1");
  });

  it("TweetsMeta ", async () => {
    const GET_META = `
    query{
    TweetsMeta{
      count
    }
  }`;
    const result = await testServer.executeOperation({ query: GET_META });
    expect(result.data.TweetsMeta.count).toBe(3);
  });

  it("create tweet ", async () => {
    const CREATE_TWEET = `
    mutation($body: String){
    createTweet(body : $body ){
      body
    }
  }`;
    const response = await testServer.executeOperation({
      query: CREATE_TWEET,
      variables: { body: "new tweet" },
    });
    expect(response.data.createTweet.body).toBe("new tweet");
  });
  
  it("delete tweet ", async () => {
    const DELETE_TWEET = `
  mutation($id: ID!){
    deleteTweet(id : $id )
  }`;
    const response = await testServer.executeOperation({
      query: DELETE_TWEET,
      variables: { id: "1" },
    });
    // console.log(response);
    expect(response.data.deleteTweet).toBe("deleted tweet 1");
  });
});

import { ApolloServer } from "apollo-server-fastify";
import context from "./context";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export default new ApolloServer({
  context,
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

import { ApolloServer } from "apollo-server-express";
import { GraphQLSchema } from "graphql";
// herramientas de GRaphQL Tools
import { makeExecutableSchema } from "@graphql-tools/schema";

import compression from "compression";
import express from "express";
import { createServer } from "http";
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

async function start(){
    const app = express();
    app.use(compression());
    
    
    const schema: GraphQLSchema = makeExecutableSchema({typeDefs,resolvers });
    const apolloServer = new ApolloServer({
        schema,
        introspection: true
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app, cors: true})
    
    app.use("/hello", ( _, res ) => {
        res.send("Bienvenidos al proyecto");
    });
    //redicreccionamos haccia /graphql para entrar en su playground
    app.get("/", ( _, res ) => {
        res.redirect("/graphql");
    });
    const httpServer = createServer(app);
    
    httpServer.listen({ port: 3025 }, () => {
        console.log ("servidor => http://localhost:3025");
    })
}

start();
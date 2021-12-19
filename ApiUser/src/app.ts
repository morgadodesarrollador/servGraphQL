import GraphQLServer from "./server";
import schema from "./db/schema";
/*
import * as cors from 'cors';
import express from "express";
var router = express.Router();
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:3026/',
    preflightContinue: false,
  };
//use cors middleware
//router.use(cors(options));

//add your routes

//enable pre-flight
//router.options('*', cors(options));
*/




//console.log (schema);
const graphQLServer = new GraphQLServer(schema);

graphQLServer.listen((port: number) => 
    console.log(`http://localhost:${port}/`));
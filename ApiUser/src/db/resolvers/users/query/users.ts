import { IUser } from './../../../interfaces/IUser';
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";

const queryResolvers: IResolvers = {
    Query: {
        users: async(_: void, __:unknown, context: { db: Db }) : Promise <Array<IUser>> => {
            const users = await context.db.collection("users").find().toArray() as Array<IUser>; 
            console.log(users);
            return users;
        }
    },
}

export default queryResolvers;
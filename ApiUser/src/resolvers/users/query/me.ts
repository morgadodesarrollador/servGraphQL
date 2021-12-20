import { IUser } from '../../../interfaces/IUser';
import { IResolvers } from "@graphql-tools/utils";
import { IResultUser } from "../../../interfaces/IResult";
import JWT from "../../../lib/jwt";
import { ELEMENTS_SELECT } from '../../../config/constants';
const queryResolvers: IResolvers = {
    Query: {
        me: async (_: void, __: unknown, context: { token: string }): Promise<IResultUser> => {
            const info = new JWT().verify(context.token);
            if (info === "Token invalido"){
                return {
                    status: false,
                    message: "token invalido o caducados", 
                    elementSelect: ELEMENTS_SELECT.USER   
                }
            }
            return {
                status: true,
                message: "Token OK",
                elementSelect: ELEMENTS_SELECT.USER,
                user: (info as unknown as { user: IUser}).user, //ver el sign,
                
            };
        }
    },
}

export default queryResolvers;
import { IUser } from './../../../interfaces/IUser';
import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IResultToken, IResultUser } from "../../../interfaces/IResult";
import bcrypt from "bcrypt";
import JWT from "../../../../lib/jwt";
import { ELEMENTS_SELECT } from '../../../../config/constants';
const queryResolvers: IResolvers = {
    Query: {
        
        login: async(_: void, args: { email: string, password: string }, context: { db: Db }): Promise<IResultToken> =>  {
            console.log(args);
            // si existe el usuario
            return await context.db.collection("users").findOne(
                { email: args.email }
            ).then( (userD) => {
                console.log(userD);
                if (!userD) {
                    return {
                        status: true,
                        message: 'Usuario No existe. Verifica el email',
                        elementSelect: ELEMENTS_SELECT.TOKEN
                    };
                }
               //comprobamos el password encriptado 
                if (!bcrypt.compareSync(args.password, userD.password)){
                    return {
                        status: true,
                        message: 'El password no es correcto',
                        elementSelect: ELEMENTS_SELECT.TOKEN
                    };
                }
               // delete userD?._id;
                delete userD.password;
                delete userD.registerDate;
                return {
                    status: true,
                    message: 'Usuario cargado',
                  //  token: new JWT().sign(userD as IUser, 3600 )
                    token: new JWT().sign(userD as IUser, 3600 ),
                    elementSelect: ELEMENTS_SELECT.TOKEN
                };
            }).catch( (error) => {
                return {
                    status: false,
                    message: `error Usuario ${error} no cargado `,
                    elementSelect: ELEMENTS_SELECT.TOKEN
                };
            });
        }
    },
}

export default queryResolvers;
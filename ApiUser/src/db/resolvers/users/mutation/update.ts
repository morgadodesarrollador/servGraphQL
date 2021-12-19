import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../../../interfaces/IUser";
import { IResultUser } from "../../../interfaces/IResult";
import JWT from "../../../../lib/jwt";
import { ELEMENTS_SELECT } from "../../../../config/constants";

const mutationResolvers: IResolvers = {
    Mutation: { 
         update: async(_: void, args: { user: IUser }, context: { db: Db, token: string }): Promise<IResultUser> => {
            //verificar el token para poder actualizar
            const info = new JWT().verify(context.token);
            if (info === "Token invalido"){
                return {
                    status: false,
                    message: "token invalido o caducados", 
                    elementSelect: ELEMENTS_SELECT.USER   
                }
            }
            //verificar que el usuario existe
            const userData: IUser = await context.db.collection("users").findOne({ id: args.user.id}) as IUser;
            if (!userData){
                return {
                    status: false,
                    message: "el usuario no se puede actualizar, no existe",
                    elementSelect: ELEMENTS_SELECT.USER
                }
            }
            //modificar la info sie el usuario existe
            //el password Y FECHA DE REGISTRO no lo modificamos aqui y lo dejamos como esta
            args.user = Object.assign(args.user, { password: userData.password, registerDate: userData.registerDate});
            return await context.db.collection("users")
                .updateOne({id: args.user.id},{$set: args.user} )
                .then( (data) => {
                    console.log("actualizado correctamente");
                    return {
                        status: true,
                        message: 'El usuario ha sido actualizado correctamente',
                        data: args.user,
                        elementSelect: ELEMENTS_SELECT.USER
                    };
                })
                .catch( (error) => {
                    return {
                        status: false,
                        message: `Error: No actualizadio ${ error }`,
                        elementSelect: ELEMENTS_SELECT.USER
                    };
                });
        }

    }
}

export default mutationResolvers;
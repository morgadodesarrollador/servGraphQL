import { IResolvers } from "@graphql-tools/utils";
import { Db } from "mongodb";
import { IUser } from "../../../interfaces/IUser";
import { IResultUser } from "../../../interfaces/IResult";
import  bcrypt  from "bcrypt";
import { ELEMENTS_SELECT } from "../../../../config/constants";

const mutationResolvers: IResolvers = {
    Mutation: { 
        // root, parametros de entrada, contexto de la bd retornado
        add: async(_: void, args: { user: IUser }, context: { db: Db } ): Promise<IResultUser> => {
            //console.log(context.db);
            //usaurio existe
            const userCheck = await context.db.collection("users").findOne({email: args.user.email});
            if (userCheck){
                return {
                    status: false,
                    message: 'El email existe y no puede usarse',
                    elementSelect: ELEMENTS_SELECT.USER
                };
            }
            if (!args.user.password){
                return {
                    status: false,
                    message: 'El password no puede ser vacio',
                    elementSelect: ELEMENTS_SELECT.USER
                };
            }
            //devuelve el id del último usuario creado      
            const lastId = await context.db.collection("users")
                .find().limit(1).sort({registerDate: -1}).toArray();
            // comprobar si existe el usuario en la BD con el mismo email. Si existe mostrar error
            args.user.id = (lastId.length === 0) ? "1" : String(+lastId[0].id + 1);
            args.user.registerDate = new Date().toISOString();
            //encriptar el password
            args.user.password = bcrypt.hashSync(args.user.password, 10);

            //insertar el usuario en la BD
            return await context.db.collection("users").insertOne(args.user)
                .then( (data) => {
                    return {
                        status: true,
                        message: 'El usuario ha sido insertado',
                        elementSelect: ELEMENTS_SELECT.USER,
                        data: args.user
                    };
                })
                .catch( (error) => {
                    return {
                        status: false,
                        message: `Error: ${ error }`,
                        elementSelect: ELEMENTS_SELECT.USER
                    };
                });
        }

    }
}

export default mutationResolvers;
import { IUser } from "../db/interfaces/IUser";
import jwt from "jsonwebtoken";

class JWT {
    private secretKey = process.env.SECRET_KEY || "clave_secreta" ;
    //Información del payload --> (userData, expiración (seg), secretKey)
    sign(data: IUser, expire = 3600 ): string {
        return jwt.sign(
            { user: data },
            this.secretKey, 
            { expiresIn: expire }
            );
    };
    verify(token: string): string {
        try{
            return jwt.verify(token, this.secretKey) as string;
        }catch (error){
            return "Token invalido"
        }
    }
}

export default JWT;
import { IUser } from "./IUser";

export interface IResultAPI {
    status: boolean;
    message: string;
    elementSelect: string;
    data?: Tipos;
}
export interface IResultUser {
    status: boolean;
    message: string;
    elementSelect: string;
    data?: IUser;
}
export interface IResultToken {
    status: boolean;
    message: string;
    elementSelect: string;
    token?: string;
}

type Tipos =
    | IUser
    | string

//export interface IResult = IResultUser | IResultToken;

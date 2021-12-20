import { IUser } from "./IUser";

export interface IResult {
    status: boolean;
    message: string;
    elementSelect: string;
}
export interface IResultUser {
    status: boolean;
    message: string;
    elementSelect: string;
    user?: IUser;
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

import type { User } from "../domain/schemas/UserSchema";

export interface IUserModel extends User{
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
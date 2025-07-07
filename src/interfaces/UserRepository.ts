import type { UserModel } from "../shared/schemas/UserSchema";

export default interface UserRepository {
    getUserById(id: number): Promise<UserModel | null>;
    getAllUsers(): Promise<UserModel[]>; 
}
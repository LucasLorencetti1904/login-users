import type { UserModel } from "../entities/User";

export default interface UserRepository {
    getUserById(id: number): Promise<UserModel | null>;
    getAllUsers(): Promise<UserModel[]>; 
}
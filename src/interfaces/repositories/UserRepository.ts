import type { UserModelDTO } from "@DTOs/UserDTO/UserOutputDTO";
import { CreateUserParsedDTO } from "@DTOs/UserDTO/CreateUserDTO";

export default interface UserRepository {
    getUserById(id: number): Promise<UserModelDTO | null>;
    getUserByUsername(username: string): Promise<UserModelDTO>;
    getUserByEmail(email: string): Promise<UserModelDTO>;
    getAllUsers(): Promise<UserModelDTO[]>;

    createUser(data: CreateUserParsedDTO): Promise<UserModelDTO>;
}
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserFormattedDataDTO from "@DTOs/UserDTO/CreateUserParsedDTO";

export default interface UserRepository {
    getUserById(id: number): Promise<UserModelDTO | null>;
    getUserByUsername(username: string): Promise<UserModelDTO>;
    getUserByEmail(email: string): Promise<UserModelDTO>;
    getAllUsers(): Promise<UserModelDTO[]>;

    createUser(data: UserFormattedDataDTO): Promise<UserModelDTO>;
}
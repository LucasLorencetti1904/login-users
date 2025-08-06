import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";

export default interface UserRepository {
    getUserById(id: number): Promise<UserModelDTO | null>;
    getAllUsers(): Promise<UserModelDTO[]>;
}
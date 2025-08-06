import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";

export default interface UserRepository {
    getUserById(id: string): Promise<UserModelDTO | null>;
}
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

export default interface UserService {
    getUser(id?: number): Promise<UserResponseDTO | UserResponseDTO[] | null>;
}
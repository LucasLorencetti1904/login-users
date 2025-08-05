import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

export default interface UserService {
    getUser(id?: number): UserResponseDTO | UserResponseDTO[] | null;
}
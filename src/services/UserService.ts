import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

export default interface UserService {
    getUser(id?: string): UserResponseDTO | UserResponseDTO[] | null;
    createUser(userData: UserRequestDTO): UserResponseDTO;
    updateUser(id: string, userData: UserRequestDTO): UserResponseDTO;
    deleteUser(id: string): UserResponseDTO;
}
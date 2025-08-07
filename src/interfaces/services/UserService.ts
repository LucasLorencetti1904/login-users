import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type OneOrMany from "@shared/types/OneOrMany";

export default interface UserService {
    getUser(id?: number): Promise<OneOrMany<UserResponseDTO> | null>;
    createUser(requestData: UserRequestDTO): Promise<UserResponseDTO>;
}
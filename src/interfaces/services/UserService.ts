import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type OneOrMany from "@shared/types/OneOrMany";

export default interface UserService {
    getUser(id?: number): Promise<OneOrMany<UserResponseDTO> | null>;
    createUser(requestData: UserCreateRequestDTO): Promise<UserResponseDTO>;
}
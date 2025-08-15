import type OneOrMany from "@shared/types/OneOrMany";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type UserCreateRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";

export default interface UserService {
    getUser(id?: number): Promise<OneOrMany<UserResponseDTO> | null>;
    createUser(requestData: UserCreateRequestDTO): Promise<UserResponseDTO>;
}
import type OneOrMany from "@shared/types/OneOrMany";
import type { UserResponseDTO } from "@DTOs/UserDTO/UserOutputDTO";
import { CreateUserRequestDTO } from "@DTOs/UserDTO/CreateUserDTO";

export default interface UserService {
    getUser(id?: number): Promise<OneOrMany<UserResponseDTO> | null>;
    createUser(requestData: CreateUserRequestDTO): Promise<UserResponseDTO>;
}
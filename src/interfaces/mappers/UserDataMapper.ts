import { CreateUserParsedDTO, CreateUserRequestDTO } from "@DTOs/UserDTO/CreateUserDTO";
import { UpdateUserParsedDTO, UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import { UserModelDTO, UserResponseDTO } from "@DTOs/UserDTO/UserOutputDTO";

export default interface UserDataMapper {
    formatCreateRequest(request: CreateUserRequestDTO): CreateUserParsedDTO;
    formatUpdateRequest(request: UpdateUserRequestDTO): UpdateUserParsedDTO
    formatResponse(model: UserModelDTO): UserResponseDTO;
}
import type UserRepository from "@interfaces/repositories/UserRepository";
import UserValidator from "@interfaces/validators/UserValidator";
import UserService from "@interfaces/services/UserService";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";


export default class UserServiceImpl implements UserService {
    constructor(
        private validator: UserValidator,
        private requestFormatter: RequestDataMapper<UserRequestDTO, UserFormattedDataDTO>,
        private repository: UserRepository,
        private responseFormatter: ResponseDataMapper<UserModelDTO, UserResponseDTO>
    ) {}

    public async getUser(id?: number): Promise<UserResponseDTO | UserResponseDTO[]> {

    }
}
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import type UserRepository from "@interfaces/repositories/UserRepository";
import UserRequestDataFormatter from "@mappers/UserRequestDataFormatter";
import UserValidator from "@interfaces/validators/UserValidator";
import UserService from "@interfaces/services/UserService";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

export default class UserServiceImpl implements UserService {
    constructor(
        private requestFormatter: UserRequestDataFormatter,
        private validator: UserValidator,
        private repository: UserRepository,
        private responseFormatter: UserResponseDataFormatter
    ) {}

    public getUser(id?: string): UserResponseDTO | UserResponseDTO[] | null {
        
    }
}
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import type UserRepository from "@repositories/userPrismaRepository";
import UserRequestDataFormatter from "@mappers/UserRequestDataFormatter";
import UserValidator from "@validators/userData/UserValidator";
import UserService from "@interfaces/services/UserService";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

export default class UserServiceImpl implements UserService {
    constructor(
        private requestFormatter: UserRequestDataFormatter,
        private validator: UserValidator,
        private repository: UserRepository,
        private responseFormatter: UserResponseDataFormatter
    ) {}

    getUser(id?: string): UserResponseDTO | UserResponseDTO[] | null {
        
    }
}
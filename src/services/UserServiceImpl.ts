import type UserService from "@interfaces/services/UserService";
import type UserValidator from "@interfaces/validators/UserValidator";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import type UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type OneOrMany from "@shared/types/OneOrMany";
import NotFoundError from "@shared/errors/responseError/NotFoundError";


export default class UserServiceImpl implements UserService {
    constructor(
        private validator: UserValidator,
        private requestFormatter: RequestDataMapper<UserRequestDTO, UserFormattedDataDTO>,
        private hasher: PasswordHasher,
        private repository: UserRepository,
        private responseFormatter: ResponseDataMapper<UserModelDTO, UserResponseDTO>
    ) {}

    public async getUser(id?: number): Promise<OneOrMany<UserResponseDTO>> {    
        const result: OneOrMany<UserModelDTO> | null = id
                ? await this.searchOneUser(id)
                : await this.searchAllUsers();

        if (!result) {
            throw new NotFoundError("User not found.");
        }

        return this.handleModelToResponse(result);
    }

    private async searchOneUser(id: number): Promise<UserModelDTO | null> {
        return await this.repository.getUserById(id);
    }

    private async searchAllUsers(): Promise<UserModelDTO[]> {
        return await this.repository.getAllUsers();
    }

    private handleModelToResponse(model: OneOrMany<UserModelDTO>): OneOrMany<UserResponseDTO> {
        if (Array.isArray(model)) {
            return this.formatModelArray(model);
        }

        return this.responseFormatter.formatModel(model);
    }

    private formatModelArray(arr: UserModelDTO[]): UserResponseDTO[] {
        return arr.map((user) => {
            return this.responseFormatter.formatModel(user);
        });
    }

    createUser(requestData: UserRequestDTO): Promise<UserResponseDTO> {
        
    }
}
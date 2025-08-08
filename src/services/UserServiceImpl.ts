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
import handleError from "@shared/utils/handleError";
import BadRequestError from "@shared/errors/responseError/BadRequestError";
import ConflictError from "@shared/errors/responseError/ConflictError";
import InternalError from "@shared/errors/responseError/InternalError";


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

    public async createUser(requestData: UserRequestDTO): Promise<UserResponseDTO> {
        try {
            this.handleValidation(requestData);

            const formattedData: UserFormattedDataDTO = this.requestFormatter.formatRequest(requestData);

            await this.searchUsername(formattedData.username);

            await this.searchEmail(formattedData.email);

            const hashedPassword: string = await this.hasher.hash(formattedData.password);

            const formattedDataWithHashedPassword = {
                ...formattedData,
                password: hashedPassword
            };

            const createdUser: UserModelDTO = await this.insert(formattedDataWithHashedPassword);

            return this.responseFormatter.formatModel(createdUser);
        }

        catch(e: unknown) {
            throw e as Error;
        }
    }

    private handleValidation(data: UserRequestDTO): void {
        try {
            this.validator.validate(data);
        }

        catch(e: unknown) {
            handleError(e, BadRequestError);
        }
    }

    private async searchUsername(username: string): Promise<void> {
        const existentUser: UserModelDTO = await this.repository.getUserByUsername(username);

        if (existentUser != null) {
            throw new ConflictError("Username already registered.");
        }
    }

    private async searchEmail(email: string): Promise<void> {
        const existentUser: UserModelDTO = await this.repository.getUserByEmail(email);

        if (existentUser != null) {
            throw new ConflictError("Email already registered.");
        }
    }

    private async insert(data: UserFormattedDataDTO): Promise<UserModelDTO> {
        try {
            return await this.repository.createUser(data);
        }

        catch(e: unknown) {
            handleError(e, InternalError);
        }
    }
}
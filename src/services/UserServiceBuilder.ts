import type Builder from "@interfaces/builders/Builder";
import UserRequestValidator from "@validators/dataValidators/UserRequestValidator";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type CreateUserRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";
import type CreateUserParsedDTO from "@DTOs/UserDTO/CreateUserParsedDTO";
import type UpdateUserRequestDTO from "@DTOs/UserDTO/UpdateUserRequestDTO";
import type UpdateUserParsedDTO from "@DTOs/UserDTO/UpdateUserParsedDTO";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type UserService from "@interfaces/services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";

export default class UserServiceBuilder implements Builder {
    private createUserDataValidator!: UserRequestValidator;
    private updateUserDataValidator!: UserRequestValidator;
    private createUserRequestFormatter!: RequestDataMapper<CreateUserRequestDTO, CreateUserParsedDTO>;
    private updateUserRequestFormatter!: RequestDataMapper<UpdateUserRequestDTO, UpdateUserParsedDTO>;
    private hasher!: PasswordHasher;
    private repository!: UserRepository;
    private userResponseFormatter!: ResponseDataMapper<UserModelDTO, UserResponseDTO>;
    
    public withCreateUserDataValidator(validator: UserRequestValidator): this {
        this.createUserDataValidator = validator;
        return this;
    }

    public withUpdateUserDataValidator(validator: UserRequestValidator): this {
        this.updateUserDataValidator = validator;
        return this;
    }

    public withCreateDataRequestFormatter(formatter: RequestDataMapper<CreateUserRequestDTO, CreateUserParsedDTO>): this {
        this.createUserRequestFormatter = formatter;
        return this;
    }

    public withUpdateDataRequestFormatter(formatter: RequestDataMapper<UpdateUserRequestDTO, UpdateUserParsedDTO>): this {
        this.updateUserRequestFormatter = formatter;
        return this;
    }

    public withHasher(hasher: PasswordHasher): this {
        this.hasher = hasher;
        return this;
    }
    
    public withRepository(repo: UserRepository): this {
        this.repository = repo;
        return this;
    }

    public withResponseFormatter(formatter: ResponseDataMapper<UserModelDTO, UserResponseDTO>): this {
        this.userResponseFormatter = formatter;
        return this;
    }

    public build(): UserService {
        if (this.isMissingProperties()) {
            throw new Error("Missing dependencies.");
        }

        return new UserServiceImpl(
            this.createUserDataValidator,
            this.updateUserDataValidator,
            this.createUserRequestFormatter,
            this.updateUserRequestFormatter,
            this.hasher,
            this.repository,
            this.userResponseFormatter
        );
    }

    private isMissingProperties(): boolean {
        return Object.values(this).some((value) => value === undefined);
    }
}
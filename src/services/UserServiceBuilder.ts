import type Builder from "@interfaces/builders/Builder";
import type UserService from "@interfaces/services/UserService";
import type UserValidator from "@validators/userData/CreateUserDataValidator";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import type UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import UserServiceImpl from "@services/UserServiceImpl";

export default class UserServiceBuilder implements Builder<UserService> {
    private validator!: UserValidator;
    private userRequestFormatter!: RequestDataMapper<UserCreateRequestDTO, UserFormattedDataDTO>;
    private hasher!: PasswordHasher;
    private repository!: UserRepository;
    private userResponseFormatter!: ResponseDataMapper<UserModelDTO, UserResponseDTO>;
    
    public withValidator(validator: UserValidator): this {
        this.validator = validator;
        return this;
    }

    public withRequestFormatter(formatter: RequestDataMapper<UserCreateRequestDTO, UserFormattedDataDTO>): this {
        this.userRequestFormatter = formatter;
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
            this.validator,
            this.userRequestFormatter,
            this.hasher,
            this.repository,
            this.userResponseFormatter
        )
    }

    private isMissingProperties(): boolean {
        return Object.values(this).some((value) => value === undefined);
    }
}
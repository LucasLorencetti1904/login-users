import type Builder from "@interfaces/builders/Builder";
import UserRequestValidator from "@validators/dataValidators/UserRequestValidator";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type UserService from "@interfaces/services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";
import UserDataMapper from "@interfaces/mappers/UserDataMapper";

export default class UserServiceBuilder implements Builder {
    private createUserDataValidator!: UserRequestValidator;
    private updateUserDataValidator!: UserRequestValidator;
    private formatter!: UserDataMapper;
    private hasher!: PasswordHasher;
    private repository!: UserRepository;
    
    public withCreateUserDataValidator(validator: UserRequestValidator): this {
        this.createUserDataValidator = validator;
        return this;
    }

    public withUpdateUserDataValidator(validator: UserRequestValidator): this {
        this.updateUserDataValidator = validator;
        return this;
    }

    public withDataFormatter(formatter: UserDataMapper): this {
        this.formatter = formatter;
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

    public build(): UserService {
        if (this.isMissingProperties()) {
            throw new Error("Missing dependencies.");
        }

        return new UserServiceImpl(
            this.createUserDataValidator,
            this.updateUserDataValidator,
            this.formatter,
            this.hasher,
            this.repository,
        );
    }

    private isMissingProperties(): boolean {
        return Object.values(this).some((value) => value === undefined);
    }
}
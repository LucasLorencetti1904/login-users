import type Builder from "@interfaces/builders/Builder";
import Validator from "@interfaces/validators/Validator";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type UserService from "@interfaces/services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";
import UserDataMapper from "@interfaces/mappers/UserDataMapper";

export default class UserServiceBuilder implements Builder {
    private createDataValidator!: Validator;
    private updateDataValidator!: Validator;
    private formatter!: UserDataMapper;
    private hasher!: PasswordHasher;
    private repository!: UserRepository;
    
    public withCreateDataValidator(validator: Validator): this {
        this.createDataValidator = validator;
        return this;
    }

    public withUpdateDataValidator(validator: Validator): this {
        this.updateDataValidator = validator;
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
            this.createDataValidator,
            this.updateDataValidator,
            this.formatter,
            this.hasher,
            this.repository,
        );
    }

    private isMissingProperties(): boolean {
        return Object.values(this).some((value) => value === undefined);
    }
}
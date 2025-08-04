import UserRequestDataFormatter from "@mappers/UserRequestDataFormatter";
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import UserRepository from "@repositories/UserRepository";
import Builder from "@services/builders/Builder";
import UserService from "@services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";
import UserValidator from "@validators/userData/UserValidator";

export default class UserServiceBuilder implements Builder<UserService> {
    private userRequestFormatter!: UserRequestDataFormatter;
    private validator!: UserValidator;
    private repository!: UserRepository;
    private userResponseFormatter!: UserResponseDataFormatter;

    public withRequestFormatter(formatter: UserRequestDataFormatter): this {
        this.userRequestFormatter = formatter;
        return this;
    }

    public withValidator(validator: UserValidator): this {
        this.validator = validator;
        return this;
    }

    public withRepository(repo: UserRepository): this {
        this.repository = repo;
        return this;
    }

    public withResponseFormatter(formatter: UserResponseDataFormatter): this {
        this.userResponseFormatter = formatter;
        return this;
    }

    public build(): UserService {
        if (this.isMissingProperties()) {
            throw new Error("Missing dependencies.");
        }

        return new UserServiceImpl(
            this.userRequestFormatter,
            this.validator,
            this.repository,
            this.userResponseFormatter
        )
    }

    private isMissingProperties(): boolean {
        return Object.values(this).some((property) => property === undefined);
    }
}
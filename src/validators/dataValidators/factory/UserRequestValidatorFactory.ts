import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import CreateUserRequestValidator from "@validators/dataValidators/CreateUserRequestValidator";
import UpdateUserRequestValidator from "@validators/dataValidators/UpdateUserRequestValidator";

export default class UserRequestValidatorFactory {
    private constructor(private userFieldValidators: UserFieldValidator[]) {}

    public static initWithFieldValidators(v: UserFieldValidator[]): UserRequestValidatorFactory {
        return new UserRequestValidatorFactory(v);
    }

    public buildCreateUserRequestValidator(): CreateUserRequestValidator {
        return new CreateUserRequestValidator(this.userFieldValidators);
    }

    public buildUpdateUserRequestValidator(): UpdateUserRequestValidator {
        return new UpdateUserRequestValidator(this.userFieldValidators);
    }
}
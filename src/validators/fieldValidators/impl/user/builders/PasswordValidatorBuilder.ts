import UserFieldValidator from "@validators/fieldValidators/impl/user/builders/UserFieldValidatorBuilder";
import PasswordValidator from "@validators/fieldValidators/impl/user/impl/password/PasswordValidator";

export default class UsernameValidatorBuilder extends UserFieldValidator {
    public build(): PasswordValidator {
        if (this.isMissingFieldName()) {
            throw new Error("PasswordValidator is missing field name.");
        }

        return new PasswordValidator(this.fieldName);
    }
}
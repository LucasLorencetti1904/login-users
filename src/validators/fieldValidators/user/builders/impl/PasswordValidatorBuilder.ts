import FieldValidatorBuilder from "@validators/fieldValidators/user/builders/abstract/FieldValidatorBuilder";
import PasswordValidator from "@validators/fieldValidators/user/impl/password/PasswordValidator";

export default class PasswordValidatorBuilder extends FieldValidatorBuilder {
    public build(): PasswordValidator {
        if (this.isMissingFieldName()) {
            throw new Error("Password Validator is missing field name.");
        }

        return new PasswordValidator(this.fieldName);
    }
}
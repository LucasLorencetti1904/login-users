import FieldValidatorBuilder from "@validators/fieldValidators/user/builders/abstract/FieldValidatorBuilder";
import UsernameValidator from "@validators/fieldValidators/user/impl/username/UsernameValidator";

export default class UsernameValidatorBuilder extends FieldValidatorBuilder {
    public build(): UsernameValidator {
        if (this.isMissingFieldName()) {
            throw new Error("Username Validator is missing field name.");
        }

        return new UsernameValidator(this.fieldName);
    }
}
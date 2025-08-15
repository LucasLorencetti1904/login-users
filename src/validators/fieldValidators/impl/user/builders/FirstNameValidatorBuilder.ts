import UserFieldValidator from "@validators/fieldValidators/impl/user/builders/UserFieldValidatorBuilder";
import FirstNameValidator from "@validators/fieldValidators/impl/user/impl/name/FirstNameValidator";

export default class UsernameValidatorBuilder extends UserFieldValidator {
    public build(): FirstNameValidator {
        if (this.isMissingFieldName()) {
            throw new Error("FirstNameValidator is missing field name.");
        }

        return new FirstNameValidator(this.fieldName);
    }
}
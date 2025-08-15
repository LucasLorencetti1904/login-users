import UserFieldValidator from "@validators/fieldValidators/impl/user/builders/UserFieldValidatorBuilder";
import LastNameValidator from "@validators/fieldValidators/impl/user/impl/name/LastNameValidator";

export default class UsernameValidatorBuilder extends UserFieldValidator {
    public build(): LastNameValidator {
        if (this.isMissingFieldName()) {
            throw new Error("LastNameValidator is missing field name.");
        }

        return new LastNameValidator(this.fieldName);
    }
}
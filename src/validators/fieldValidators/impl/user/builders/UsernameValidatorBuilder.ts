import UserFieldValidator from "@validators/fieldValidators/impl/user/builders/UserFieldValidatorBuilder";
import UsernameValidator from "@validators/fieldValidators/impl/user/impl/username/UsernameValidator";

export default class UsernameValidatorBuilder extends UserFieldValidator {
    public build(): UsernameValidator {
        if (this.isMissingFieldName()) {
            throw new Error("UsernameValidator is missing field name.");
        }

        return new UsernameValidator(this.fieldName);
    }
}
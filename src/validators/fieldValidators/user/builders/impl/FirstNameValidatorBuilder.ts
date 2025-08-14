import FieldValidatorBuilder from "@validators/fieldValidators/user/builders/abstract/FieldValidatorBuilder";
import FirstNameValidator from "@validators/fieldValidators/user/impl/name/FirstNameValidator";

export default class FirstNameValidatorBuilder extends FieldValidatorBuilder {
    public build(): FirstNameValidator {
        if (this.isMissingFieldName()) {
            throw new Error("First Name Validator is missing field name.");
        }

        return new FirstNameValidator(this.fieldName);
    }
}
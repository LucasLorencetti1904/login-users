import FieldValidatorBuilder from "@validators/fieldValidators/user/builders/abstract/FieldValidatorBuilder";
import LastNameValidator from "@validators/fieldValidators/user/impl/name/LastNameValidator";

export default class LastNameValidatorBuilder extends FieldValidatorBuilder {
    public build(): LastNameValidator {
        if (this.isMissingFieldName()) {
            throw new Error("Last Name Validator is missing field name.");
        }

        return new LastNameValidator(this.fieldName);
    }
}
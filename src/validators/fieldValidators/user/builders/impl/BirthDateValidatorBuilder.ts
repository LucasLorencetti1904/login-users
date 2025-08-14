import FieldValidatorBuilder from "@validators/fieldValidators/user/builders/abstract/FieldValidatorBuilder";
import BirthDateValidator from "@validators/fieldValidators/user/impl/birthDate/BirthDateValidator";

export default class BirthDateValidatorBuilder extends FieldValidatorBuilder {
    public build(): BirthDateValidator {
        if (this.isMissingFieldName()) {
            throw new Error("Birth Date Validator is missing field name.");
        }

        return new BirthDateValidator(this.fieldName);
    }
}
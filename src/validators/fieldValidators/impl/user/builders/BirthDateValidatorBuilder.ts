import UserFieldValidator from "@validators/fieldValidators/impl/user/builders/UserFieldValidatorBuilder";
import BirthDateValidator from "@validators/fieldValidators/impl/user/impl/birthDate/BirthDateValidator";

export default class BirthDateValidatorBuilder extends UserFieldValidator {
    public build(): BirthDateValidator {
        if (this.isMissingFieldName()) {
            throw new Error("BirthDateValidator is missing field name.");
        }

        return new BirthDateValidator(this.fieldName);
    }
}
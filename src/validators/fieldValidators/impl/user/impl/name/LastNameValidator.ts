import NameValidator from "@validators/fieldValidators/impl/user/impl/name/NameValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class LastNameValidator extends NameValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Last name");

    public static initWithFieldName(fieldName: string): LastNameValidator {
        return new LastNameValidator(fieldName);
    }
}
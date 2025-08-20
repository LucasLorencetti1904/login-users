import NameValidator from "@validators/fieldValidators/impl/user/impl/name/NameValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class FirstNameValidator extends NameValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("First name");

    public static initWithFieldName(fieldName: string): FirstNameValidator {
        return new FirstNameValidator(fieldName);
    }
}
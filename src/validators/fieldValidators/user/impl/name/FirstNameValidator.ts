import NameValidator from "@validators/fieldValidators/user/impl/name/NameValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class FirstNameValidator extends NameValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("First name");
}
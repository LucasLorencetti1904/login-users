import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { BirthDateValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";

export default class BirthDateValidator extends VanillaDataValidator<BirthDateValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");
    
    constructor(private birthDate: Date) {
        super(birthDate);

        this.validate();
    }

    protected createError(message: string): BirthDateValidationError {
        return new BirthDateValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
    }

    private isEmpty(): boolean {
        return !this.birthDate;
    }
}
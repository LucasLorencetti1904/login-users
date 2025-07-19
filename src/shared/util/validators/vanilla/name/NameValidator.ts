import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { NameValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";

export default class NameValidator extends VanillaDataValidator<NameValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Name");

    constructor(private name: string) {
        super(name);

        this.validate();
    }

    protected createError(message: string): NameValidationError {
        return new NameValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.containsNumber(), this.errorMessage.contains("numbers")
        );
        this.failsIf (
            this.tooShort(), this.errorMessage.minLength(4)
        );
        this.failsIf (
            this.tooLong(), this.errorMessage.maxLength(14)
        );
        this.failsIf (
            this.containsSpaces(), this.errorMessage.contains("spaces")
    );
        this.failsIf (
            this.containsSpecialCharacters(), this.errorMessage.contains("special characters")
    );
    }

    private isEmpty(): boolean {
        return !this.name;
    }

    private containsNumber(): boolean {
        return /[0-9]/.test(this.name);
    }

    private tooShort(): boolean {
        return this.name.length < 4;
    }

    private tooLong(): boolean {
        return this.name.length > 14;
    }

    private containsSpaces(): boolean {
        return this.name.includes(" ");
    }

    private containsSpecialCharacters(): boolean {
        return /[^a-zA-Z]/.test(this.name);
    }
}
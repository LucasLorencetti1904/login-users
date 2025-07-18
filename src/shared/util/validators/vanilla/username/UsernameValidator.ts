import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { UsernameValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";

export default class UsernameValidator extends VanillaDataValidator<UsernameValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Username");

    constructor(private username: string) {
        super(username);

        this.validate();
    }

    protected createError(message: string): UsernameValidationError {
        return new UsernameValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.startsWithNumber(), this.errorMessage.startsWith("numbers")
        );
        this.failsIf (
            this.tooSmall(), this.errorMessage.minLength(4)
        );
        this.failsIf (
            this.tooBig(), this.errorMessage.maxLength(10)
        );
        this.failsIf (
            this.containsSpaces(), this.errorMessage.contains("spaces")
        );
        this.failsIf (
            this.containsSpecialCharacters(), this.errorMessage.contains("special characters")
        );
    }

    private isEmpty(): boolean {
        return !this.username;
    }

    private startsWithNumber(): boolean {
        const firstChar: string = this.username[0]; 
        return /[0-9]/.test(firstChar);
    }

    private tooSmall(): boolean {
        return this.username.length < 4;
    }

    private tooBig(): boolean {
        return this.username.length > 10;
    }

    private containsSpaces(): boolean {
        return this.username.includes(" ");
    }

    private containsSpecialCharacters(): boolean {
        return /[^a-zA-Z0-9_]/.test(this.username);
    }
}
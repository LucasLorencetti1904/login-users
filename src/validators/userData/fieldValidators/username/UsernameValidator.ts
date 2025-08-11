import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class UsernameValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Username");

    constructor(private username: string) {
        super(username);

        this.validate();
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.startsWithNumber(), this.errorMessage.startsWith("numbers")
        );
        this.failsIf (
            this.isTooShort(), this.errorMessage.minLength(4)
        );
        this.failsIf (
            this.isTooLong(), this.errorMessage.maxLength(10)
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

    private isTooShort(): boolean {
        return this.username.length < 4;
    }

    private isTooLong(): boolean {
        return this.username.length > 10;
    }

    private containsSpaces(): boolean {
        return this.username.includes(" ");
    }

    private containsSpecialCharacters(): boolean {
        return /[^a-zA-Z0-9_]/.test(this.username);
    }
}
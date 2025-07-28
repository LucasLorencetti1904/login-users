import ErrorMessageGenerator from "@shared/errors/ErrorMessageGenerator";
import UserDataValidator from "@validators/userData/UserDataValidator";

export default class NameValidator extends UserDataValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Name");

    constructor(private name: string) {
        super(name);

        this.validate();
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.containsNumber(), this.errorMessage.contains("numbers")
        );
        this.failsIf (
            this.isTooShort(), this.errorMessage.minLength(4)
        );
        this.failsIf (
            this.isTooLong(), this.errorMessage.maxLength(14)
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

    private isTooShort(): boolean {
        return this.name.length < 4;
    }

    private isTooLong(): boolean {
        return this.name.length > 14;
    }

    private containsSpaces(): boolean {
        return this.name.includes(" ");
    }

    private containsSpecialCharacters(): boolean {
        return /[^a-zA-Z]/.test(this.name);
    }
}
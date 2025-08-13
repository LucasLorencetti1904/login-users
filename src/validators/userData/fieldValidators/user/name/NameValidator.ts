import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class NameValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Name");

    public validate(name: string): void {
        name = this.handleStringField(name);

        this.failsIf (
            this.isEmpty(name), this.errorMessage.isEmpty
        );

        this.failsIf (
            this.containsNumber(name), this.errorMessage.contains("numbers")
        );
        
        this.failsIf (
            this.isTooShort(name), this.errorMessage.minLength(4)
        );

        this.failsIf (
            this.isTooLong(name), this.errorMessage.maxLength(14)
        );

        this.failsIf (
            this.containsSpaces(name), this.errorMessage.contains("spaces")
        );

        this.failsIf (
            this.containsSpecialCharacters(name), this.errorMessage.contains("special characters")
        );
    }

    private isEmpty(name: string): boolean {
        return !name;
    }

    private containsNumber(name: string): boolean {
        return /[0-9]/.test(name);
    }

    private isTooShort(name: string): boolean {
        return name.length < 4;
    }

    private isTooLong(name: string): boolean {
        return name.length > 14;
    }

    private containsSpaces(name: string): boolean {
        return name.includes(" ");
    }

    private containsSpecialCharacters(name: string): boolean {
        return /[^a-zA-Z]/.test(name);
    }
}
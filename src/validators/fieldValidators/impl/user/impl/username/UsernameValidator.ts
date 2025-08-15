import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class UsernameValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Username");

    public validate(username: string): void {
        username = this.handleStringField(username);

        this.failsIf (
            this.isEmpty(username), this.errorMessage.isEmpty
        );

        this.failsIf (
            this.startsWithNumber(username), this.errorMessage.startsWith("numbers")
        );

        this.failsIf (
            this.isTooShort(username), this.errorMessage.minLength(4)
        );

        this.failsIf (
            this.isTooLong(username), this.errorMessage.maxLength(10)
        );

        this.failsIf (
            this.containsSpaces(username), this.errorMessage.contains("spaces")
        );

        this.failsIf (
            this.containsSpecialCharacters(username), this.errorMessage.contains("special characters")
        );
    }

    private isEmpty(username: string): boolean {
        return !username;
    }

    private startsWithNumber(username: string): boolean {
        const firstChar: string = username[0]; 
        return /[0-9]/.test(firstChar);
    }

    private isTooShort(username: string): boolean {
        return username.length < 4;
    }

    private isTooLong(username: string): boolean {
        return username.length > 10;
    }

    private containsSpaces(username: string): boolean {
        return username.includes(" ");
    }

    private containsSpecialCharacters(username: string): boolean {
        return /[^a-zA-Z0-9_]/.test(username);
    }
}
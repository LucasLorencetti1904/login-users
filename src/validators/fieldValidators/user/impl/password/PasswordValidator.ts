import UserFieldValidator from "@validators/fieldValidators/user/abstract/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class PasswordValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Password");

    public validate(password: string): void {
        password = this.handleStringField(password);

        this.failsIf (
            this.isEmpty(password), this.errorMessage.isEmpty
        );

        this.failsIf (
            this.isTooShort(password), this.errorMessage.minLength(8)
        );

        this.failsIf (
            this.isTooLong(password), this.errorMessage.maxLength(20)
        );

        this.failsIf (
            this.isMissingLetter(password), this.errorMessage.missingAtLeast("one letter")
        ); 

        this.failsIf (
            this.isMissingNumber(password), this.errorMessage.missingAtLeast("one number")
        );

        this.failsIf (
            this.isMissingLowerCase(password), this.errorMessage.missingAtLeast("one lowercase letter")
        );

        this.failsIf (
            this.isMissingUpperCase(password), this.errorMessage.missingAtLeast("one uppercase letter")
        );

        this.failsIf (
            this.isMissingSpecialCharacter(password), this.errorMessage.missingAtLeast("one special character")
        );
    }

    private isEmpty(password: string): boolean {
        return !password;
    }

    private isTooShort(password: string): boolean {
        return password.length < 8;
    }

    private isTooLong(password: string): boolean {
        return password.length > 20;
    }

    private isMissingLetter(password: string): boolean {
        return /^[^\p{L}]+$/u.test(password);
    }

    private isMissingNumber(password: string): boolean {
        return !/\d/.test(password);
    }

    private isMissingLowerCase(password: string): boolean {
        return !/[a-z]/.test(password);
    }

    private isMissingUpperCase(password: string): boolean {
        return !/[A-Z]/.test(password);
    }

    private isMissingSpecialCharacter(password: string): boolean {
        return !/[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(password);
    }
}
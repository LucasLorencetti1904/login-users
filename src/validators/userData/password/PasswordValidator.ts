import UserDataValidator from "@validators/userData/UserDataValidator";
import ErrorMessageGenerator from "@shared/errors/ErrorMessageGenerator";

export default class PasswordValidator extends UserDataValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Password");

    constructor(private password: string) {
        super(password);

        this.validate();
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );

        this.failsIf (
            this.isTooShort(), this.errorMessage.minLength(8)
        );

        this.failsIf (
            this.isTooLong(), this.errorMessage.maxLength(20)
        );

        this.failsIf (
            this.isMissingLetter(), this.errorMessage.missingAtLeast("one letter")
        ); 

        this.failsIf (
            this.isMissingNumber(), this.errorMessage.missingAtLeast("one number")
        );

        this.failsIf (
            this.isMissingLowerCase(), this.errorMessage.missingAtLeast("one lowercase letter")
        );

        this.failsIf (
            this.isMissingUpperCase(), this.errorMessage.missingAtLeast("one uppercase letter")
        );

        this.failsIf (
            this.isMissingSpecialCharacter(), this.errorMessage.missingAtLeast("one special character")
        );
    }

    private isEmpty(): boolean {
        return !this.password;
    }

    private isTooShort(): boolean {
        return this.password.length < 8;
    }

    private isTooLong(): boolean {
        return this.password.length > 20;
    }

    private isMissingLetter(): boolean {
        return /^[^\p{L}]+$/u.test(this.password);
    }

    private isMissingNumber(): boolean {
        return !/\d/.test(this.password);
    }

    private isMissingLowerCase(): boolean {
        return !/[a-z]/.test(this.password);
    }

    private isMissingUpperCase(): boolean {
        return !/[A-Z]/.test(this.password);
    }

    private isMissingSpecialCharacter(): boolean {
        return !/[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(this.password);
    }
}
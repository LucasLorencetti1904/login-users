import UserDataValidator from "@validators/userData/fieldValidators/UserDataValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class EmailUserValidator extends UserDataValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email user");

    private static readonly CHARACTERS_REGEX = /[(),:;<>[\]\\]/;
    
    private static readonly MIN_LENGTH: number = 4;
    private static readonly MAX_LENGTH: number = 64;

    constructor(private user: string) {
        super(user);

        this.validate();
    }

    public validate(): void {
        this.failsIf (
            this.startsWithInvalidCharacter(), this.errorMessage.startsWith("invalid characters")
        );
        
        this.failsIf (
            this.containsSpaces(), this.errorMessage.contains("spaces")
        );

        this.failsIf (
            this.containsInvalidCharacters(), this.errorMessage.contains("invalid characters")
        );
        
        this.failsIf (
            this.isTooShort(), this.errorMessage.minLength(EmailUserValidator.MIN_LENGTH)
        );
        
        this.failsIf (
            this.isTooLong(), this.errorMessage.maxLength(EmailUserValidator.MAX_LENGTH)
        );
    }

    private startsWithInvalidCharacter(): boolean {
        const firstChar: string = this.user[0]; 
        return !/^[a-zA-Z]/.test(firstChar);
    }
    
    private containsSpaces(): boolean {
        return this.user.includes(" ");
    }

    private containsInvalidCharacters(): boolean {
        return EmailUserValidator.CHARACTERS_REGEX.test(this.user);
    }

    private isTooShort(): boolean {
        return this.user.length < EmailUserValidator.MIN_LENGTH;
    }

    private isTooLong(): boolean {
        return this.user.length > EmailUserValidator.MAX_LENGTH;
    }
}
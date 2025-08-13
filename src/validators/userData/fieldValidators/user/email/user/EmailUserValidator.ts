import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class EmailUserValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email user");

    private static readonly CHARACTERS_REGEX = /[(),:;<>[\]\\]/;
    
    private static readonly MIN_LENGTH: number = 4;
    private static readonly MAX_LENGTH: number = 64;

    public validate(user: string): void {
        this.failsIf (
            this.startsWithInvalidCharacter(user), this.errorMessage.startsWith("invalid characters")
        );
        
        this.failsIf (
            this.containsSpaces(user), this.errorMessage.contains("spaces")
        );

        this.failsIf (
            this.containsInvalidCharacters(user), this.errorMessage.contains("invalid characters")
        );
        
        this.failsIf (
            this.isTooShort(user), this.errorMessage.minLength(EmailUserValidator.MIN_LENGTH)
        );
        
        this.failsIf (
            this.isTooLong(user), this.errorMessage.maxLength(EmailUserValidator.MAX_LENGTH)
        );
    }

    private startsWithInvalidCharacter(user: string): boolean {
        const firstChar: string = user[0]; 
        return !/^[a-zA-Z]/.test(firstChar);
    }
    
    private containsSpaces(user: string): boolean {
        return user.includes(" ");
    }

    private containsInvalidCharacters(user: string): boolean {
        return EmailUserValidator.CHARACTERS_REGEX.test(user);
    }

    private isTooShort(user: string): boolean {
        return user.length < EmailUserValidator.MIN_LENGTH;
    }

    private isTooLong(user: string): boolean {
        return user.length > EmailUserValidator.MAX_LENGTH;
    }
}
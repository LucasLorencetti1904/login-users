import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import failsIf from "@shared/utils/failsIf";

export default class EmailUserPartHandler implements EmailPartHandler {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email user");

    private static readonly CHARACTERS_REGEX = /[(),:;<>[\]\\]/;
    
    private static readonly MIN_LENGTH: number = 4;
    private static readonly MAX_LENGTH: number = 64;

    public handle(user: string): void {
        failsIf (
            this.startsWithInvalidCharacter(user), this.errorMessage.startsWith("invalid characters")
        );
        
        failsIf (
            this.containsSpaces(user), this.errorMessage.contains("spaces")
        );

        failsIf (
            this.containsInvalidCharacters(user), this.errorMessage.contains("invalid characters")
        );
        
        failsIf (
            this.isTooShort(user), this.errorMessage.minLength(EmailUserPartHandler.MIN_LENGTH)
        );
        
        failsIf (
            this.isTooLong(user), this.errorMessage.maxLength(EmailUserPartHandler.MAX_LENGTH)
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
        return EmailUserPartHandler.CHARACTERS_REGEX.test(user);
    }

    private isTooShort(user: string): boolean {
        return user.length < EmailUserPartHandler.MIN_LENGTH;
    }

    private isTooLong(user: string): boolean {
        return user.length > EmailUserPartHandler.MAX_LENGTH;
    }
}
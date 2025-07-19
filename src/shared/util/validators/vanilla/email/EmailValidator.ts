import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import quantityOf from "../../../../helpers/quantityOf";
import { EmailValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaUserDataValidator";
import EmailDomainValidator from "./EmailDomainValidator";

export default class EmailValidator extends VanillaDataValidator<EmailValidationError> {
    private static readonly INVALID_EMAIL_CHARACTERS_REGEX = /[(),:;<>[\]\\]/;
    
    private static readonly EMAIL_USER_MIN_LENGTH: number = 4;
    private static readonly EMAIL_USER_MAX_LENGTH: number = 64;
    
    private static readonly SYMBOL: string = "@";
    
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email");
    
    constructor(private email: string) {
        super(email);

        const [user, domain] = this.splitEmailIfIsNotEmptyAndContainsSymbol();
        
        this.email = user;
        
        this.handleDomain(domain);

        this.validate();
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
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
            this.tooShort(), this.errorMessage.minLength(EmailValidator.EMAIL_USER_MIN_LENGTH)
        );
        
        this.failsIf (
            this.tooLong(), this.errorMessage.maxLength(EmailValidator.EMAIL_USER_MAX_LENGTH)
        );
    }
    
    private splitEmailIfIsNotEmptyAndContainsSymbol(): string[] {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.hasInvalidNumberOfSymbols(), this.errorMessage.hasAnInvalidFormat
        );
        
        return this.email.split(EmailValidator.SYMBOL);     
    }

    private handleDomain(domain: string): void {
        try {
            new EmailDomainValidator(domain);
        } catch (e: unknown) {
            this.failsIf(true, this.errorMessage.contains((e as EmailValidationError).message));
        }
    }

    private isEmpty(): boolean {
        return !this.email;
    }

    private hasInvalidNumberOfSymbols(): boolean {
        return this.getNumberOfSymbols() != 1;
    }
    
    private startsWithInvalidCharacter(): boolean {
        const firstChar: string = this.email[0]; 
        return !/^[a-zA-Z]/.test(firstChar);
    }
    
    private containsSpaces(): boolean {
        return this.email.includes(" ");
    }

    private containsInvalidCharacters(): boolean {
        return EmailValidator.INVALID_EMAIL_CHARACTERS_REGEX.test(this.email);
    }

    private tooShort(): boolean {
        return this.email.length < EmailValidator.EMAIL_USER_MIN_LENGTH;
    }

    private tooLong(): boolean {
        return this.email.length > EmailValidator.EMAIL_USER_MAX_LENGTH;
    }
    
    private getNumberOfSymbols(): number {
        return quantityOf(EmailValidator.SYMBOL).in(this.email);
    }
}
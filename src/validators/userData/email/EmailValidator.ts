import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import quantityOf from "../../../../helpers/quantityOf";
import { EmailValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";
import EmailDomainValidator from "./domain/EmailDomainValidator";
import EmailUserValidator from "./user/EmailUserValidator";

export default class EmailValidator extends VanillaDataValidator<EmailValidationError> { 
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email");

    private static readonly SYMBOL: string = "@";
    
    constructor(private email: string) {
        super(email);

        this.validate();

        const emailParts: string[] = this.splitEmainInUserAndDomain();
        
        this.handleEmailParts(emailParts)
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }
    
    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.hasInvalidNumberOfSymbols(), this.errorMessage.hasAnInvalidFormat
        );       
    }
    
    private isEmpty(): boolean {
        return !this.email;
    }
    
    private hasInvalidNumberOfSymbols(): boolean {
        return this.getNumberOfSymbols() != 1;
    }
    
    private getNumberOfSymbols(): number {
        return quantityOf(EmailValidator.SYMBOL).in(this.email);
    }

    private splitEmainInUserAndDomain(): string[] {
        return this.email.split(EmailValidator.SYMBOL);     
    }  

    private handleEmailParts(emailParts: string[]) {
        const [user, domain] = emailParts;

        try {
            this.handleUser(user);
            this.handleDomain(domain);
        }

        catch (e: unknown) {
            this.failsIf (
                true, (e as EmailValidationError).message
            );
        }
    }
    
    private handleUser(user: string): void {
        new EmailUserValidator(user);
    }

    private handleDomain(domain: string): void {
        new EmailDomainValidator(domain);
    }
}
import UserDataValidator from "@validators/userData/fieldValidators/UserDataValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import EmailUserValidator from "@validators/userData/fieldValidators/email/user/EmailUserValidator";
import EmailDomainValidator from "@validators/userData/fieldValidators/email/domain/EmailDomainValidator";
import occurrencesOf from "@shared/utils/occurrencesOf";

export default class EmailValidator extends UserDataValidator { 
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email");

    private static readonly SYMBOL: string = "@";
    
    constructor(private email: string) {
        super(email);

        email.toLowerCase();

        this.validate();

        const emailParts: string[] = this.splitEmainInUserAndDomain();
        
        this.handleEmailParts(emailParts)
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
        return occurrencesOf(EmailValidator.SYMBOL, this.email);
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
            throw e as Error;
        }
    }
    
    private handleUser(user: string): void {
        new EmailUserValidator(user);
    }

    private handleDomain(domain: string): void {
        new EmailDomainValidator(domain);
    }
}
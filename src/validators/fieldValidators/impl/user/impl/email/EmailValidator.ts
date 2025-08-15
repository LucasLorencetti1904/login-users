import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";
import occurrencesOf from "@shared/utils/occurrencesOf";

export default class EmailValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email");

    private static readonly SYMBOL: string = "@";
    
    constructor (
        public fieldName: string,
        private userHandler: EmailPartHandler,
        private domainHandler: EmailPartHandler
    ) {
        super(fieldName);
    }

    public validate(email: string): void {
        email = this.handleStringField(email);

        this.failsIf (
            this.isEmpty(email), this.errorMessage.isEmpty
        );

        this.failsIf (
            this.hasInvalidNumberOfSymbols(email), this.errorMessage.hasAnInvalidFormat
        );      

        const emailParts: string[] = this.splitEmainInUserAndDomain(email);
        
        this.handleEmailParts(emailParts);
    }
    
    private isEmpty(email: string): boolean {
        return !email;
    }
    
    private hasInvalidNumberOfSymbols(email: string): boolean {
        return this.getNumberOfSymbols(email) != 1;
    }
    
    private getNumberOfSymbols(email: string): number {
        return occurrencesOf(EmailValidator.SYMBOL, email);
    }

    private splitEmainInUserAndDomain(email: string): string[] {
        return email.split(EmailValidator.SYMBOL);     
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
        this.userHandler.handle(user);
    }

    private handleDomain(domain: string): void {
        this.domainHandler.handle(domain);
    }
}
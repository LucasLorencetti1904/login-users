import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import EmailDomainCountryCodeValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainCountryCodeValidator";
import EmailDomainSLDValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainSLDValidator";
import EmailDomainTLDValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainTLDValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import ocurrencesOf from "@shared/utils/occurrencesOf";

export default class EmailDomainValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email domain");

    private static readonly DOT: string = ".";
    private static readonly MAXIMUM_NUMBER_OF_DOTS: number = 2;

    public validate(domain: string): void {
        this.failsIf (
            this.hasInvalidNumberOfDots(domain), this.errorMessage.hasAnInvalidFormat
        );
        
        const domainParts: string[] = this.splitDomainInLevelParts(domain);
    
        this.handleDomainParts(domainParts);
    }
    
    private splitDomainInLevelParts(domain: string): string[] {
        return domain.split(EmailDomainValidator.DOT);
    }
    
    private hasInvalidNumberOfDots(domain: string): boolean {
        return this.hasNoDots(domain) || this.hasManyDots(domain);
    }
    
    private hasNoDots(domain: string): boolean {
        return this.getNumberOfDots(domain) < 1;
    }
    
    private hasManyDots(domain: string): boolean {
        return this.getNumberOfDots(domain) > EmailDomainValidator.MAXIMUM_NUMBER_OF_DOTS;
    }
    
        private getNumberOfDots(domain: string): number {
            return ocurrencesOf(EmailDomainValidator.DOT, domain);
        }
    
    private handleDomainParts(domainParts: string[]): void {
        const [SLD, TLD, countryCode] = domainParts;

        try {
            this.handleSLD(SLD);
            this.handleTLD(TLD);
            this.handleCountryCode(countryCode);
        }

        catch(e: unknown) {
            throw e as Error;
        }
    }
    private handleSLD(SLD: string): void {
        new EmailDomainSLDValidator().validate(SLD);
    }

    private handleTLD(TLD: string): void {
        new EmailDomainTLDValidator().validate(TLD);
    }
    
    private handleCountryCode(countryCode: string): void {
        new EmailDomainCountryCodeValidator().validate(countryCode);
    }
}
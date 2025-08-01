import UserDataValidator from "@validators/userData/UserDataValidator";
import EmailDomainCountryCodeValidator from "@validators/userData/email/domain/EmailDomainCountryCodeValidator";
import EmailDomainSLDValidator from "@validators/userData/email/domain/EmailDomainSLDValidator";
import EmailDomainTLDValidator from "@validators/userData/email/domain/EmailDomainTLDValidator";
import type { EmailSecondLevelDomain, EmailTopLevelDomain, EmailTopLevelDomainCountryCode }
    from "@shared/types/emailDomainTypes";
import type { Maybe } from "@shared//types/optionalTypes";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import ocurrencesOf from "@shared/utils/occurrencesOf";

export default class EmailDomainValidator extends UserDataValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email domain");

    private static readonly DOT: string = ".";
    private static readonly MAXIMUM_NUMBER_OF_DOTS: number = 2;

    constructor(private domain: string) {
        super(domain);

        this.validate();

        const domainParts: string[] = this.splitDomainInLevelParts();

        this.handleDomainParts(domainParts);

    }

    public validate(): void {
        this.failsIf (
            this.hasInvalidNumberOfDots(), this.errorMessage.hasAnInvalidFormat
        );
    }

    private splitDomainInLevelParts(): string[] {
        return this.domain.split(EmailDomainValidator.DOT);
    }

    private hasInvalidNumberOfDots(): boolean {
        return this.hasNoDots() || this.hasManyDots();
    }
    
    private hasNoDots(): boolean {
        return this.getNumberOfDots() < 1;
    }
    
    private hasManyDots(): boolean {
        return this.getNumberOfDots() > EmailDomainValidator.MAXIMUM_NUMBER_OF_DOTS;
    }
    
        private getNumberOfDots(): number {
            return ocurrencesOf(EmailDomainValidator.DOT, this.domain);
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
    private handleSLD(SLD: Maybe<EmailSecondLevelDomain>): void {
        new EmailDomainSLDValidator(SLD);
    }

    private handleTLD(TLD: Maybe<EmailTopLevelDomain>): void {
        new EmailDomainTLDValidator(TLD);
    }
    
    private handleCountryCode(countryCode: Maybe<EmailTopLevelDomainCountryCode>): void {
        new EmailDomainCountryCodeValidator(countryCode);
    }
}
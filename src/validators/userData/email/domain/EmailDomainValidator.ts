import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import quantityOf from "../../../../../helpers/quantityOf";
import type { EmailSecondLevelDomain, EmailTopLevelDomain, EmailTopLevelDomainCountryCode } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import { EmailValidationError } from "../../../../errors/DataValidationError";
import VanillaDataValidator from "../../VanillaDataValidator";
import EmailDomainCountryCodeValidator from "./EmailDomainCountryCodeValidator";
import EmailDomainSLDValidator from "./EmailDomainSLDValidator";
import EmailDomainTLDValidator from "./EmailDomainTLDValidator";

export default class EmailDomainValidator extends VanillaDataValidator<EmailValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email domain");

    private static readonly DOT: string = ".";
    private static readonly MAXIMUM_NUMBER_OF_DOTS: number = 2;

    constructor(private domain: string) {
        super(domain);

        this.validate();

        const domainParts: string[] = this.splitDomainInLevelParts();

        this.handleDomainParts(domainParts);

    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
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
            return quantityOf(EmailDomainValidator.DOT).in(this.domain);
        }
    
    private handleDomainParts(domainParts: string[]): void {
        const [SLD, TLD, countryCode] = domainParts;

        try {
            this.handleSLD(SLD);
            this.handleTLD(TLD);
            this.handleCountryCode(countryCode);
        }

        catch(e: unknown) {
            this.failsIf (
                true, (e as EmailValidationError).message
            );;
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
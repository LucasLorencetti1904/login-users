import { EMAIL_SECOND_LEVEL_DOMAIN, EMAIL_TOP_LEVEL_DOMAIN, EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import type { EmailSecondLevelDomain, EmailTopLevelDomain, EmailTopLevelDomainCountryCode } from "../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../types/optionalTypes";
import { EmailValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaUserDataValidator";

export default class EmailDomainValidator extends VanillaDataValidator<EmailValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email");

    private static readonly DOMAIN_DOT: string = ".";
    private static readonly MAXIMUM_NUMBER_OF_DOMAIN_DOTS: number = 2;

    private SLD: Maybe<EmailSecondLevelDomain>;
    private TLD: Maybe<EmailTopLevelDomain>;
    private countryCode: Maybe<EmailTopLevelDomainCountryCode>;

    constructor(private domain: string) {
        super(domain);

        const [SLD, TLD, countryCode] = this.splitDomainIfContainValidNumberOfDots();

        this.SLD = SLD;
        this.TLD = TLD;
        this.countryCode = countryCode;

        this.validate();
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.hasAnInvalidFormat(), this.errorMessage.hasAnInvalidFormat
        );
    }

    private splitDomainIfContainValidNumberOfDots(): string[] {
        this.failsIf (
            this.hasInvalidNumberOfDots(), this.errorMessage.hasAnInvalidFormat
        );

        return this.domain.split(EmailDomainValidator.DOMAIN_DOT);
    }

    
    private hasAnInvalidFormat(): boolean {
        return this.somePartHasAnInvalidFormat() || this.doesNotMatchExpectedFormat()
    }

    private hasInvalidNumberOfDots(): boolean {
        return this.hasNoDots() || this.hasManyDots();
    }
    
    private somePartHasAnInvalidFormat(): boolean {
        const parts: boolean[] = [
            this.topLevelHasAnInvalidFormat(),
            this.topLevelCountryCodeHasAnInvalidFormat(),
            this.secondLevelHasAnInvalidFormat()
        ];

        return parts.some(Boolean);
    }

    private doesNotMatchExpectedFormat(): boolean {
        return this.domain != this.reconstructExpectedFormat();
    }
    
    private hasNoDots(): boolean {
        return this.getNumberOfDots() < 1;
    }

    private hasManyDots(): boolean {
        return this.getNumberOfDots() > EmailDomainValidator.MAXIMUM_NUMBER_OF_DOMAIN_DOTS;
    }
    
    private topLevelHasAnInvalidFormat(): boolean {
        const isInvalidFormat: boolean = this.TLD
            ? !EMAIL_TOP_LEVEL_DOMAIN.includes(this.TLD)
            : true;

        return isInvalidFormat;
    }

    private topLevelCountryCodeHasAnInvalidFormat(): boolean {
        const isInvalidFormat: boolean = this.countryCode
            ? !EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE.includes(this.countryCode)
            : false;
        
        return isInvalidFormat;
    }

    private secondLevelHasAnInvalidFormat(): boolean {
        const isInvalidFormat: boolean = this.SLD
        ? !EMAIL_SECOND_LEVEL_DOMAIN.includes(this.SLD)
        : true;

        return isInvalidFormat;
    }
    
    private reconstructExpectedFormat(): string {
        const existentDomainParts: string[] = this.getOrderedParts().filter(Boolean) as string[];
        const domainFormat: string = existentDomainParts.join(EmailDomainValidator.DOMAIN_DOT);

        return domainFormat;
    }

    private getNumberOfDots(): number {
        return this.domain.split(EmailDomainValidator.DOMAIN_DOT).length - 1;
    }

    private getOrderedParts(): Maybe<string>[] {
        return [this.SLD, this.TLD, this.countryCode];
    }
}
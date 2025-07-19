import { EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "../../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator"
import type { EmailTopLevelDomainCountryCode } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import { EmailValidationError } from "../../../../errors/DataValidationError"
import VanillaDataValidator from "../../VanillaDataValidator"

export default class EmailDomainCountryCodeValidator extends VanillaDataValidator<EmailValidationError> {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email domain country code");

    constructor(private countryCode: Maybe<EmailTopLevelDomainCountryCode>) {
        super(countryCode);

        this.validate();
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.topLevelCountryCodeHasAnInvalidFormat(), this.errorMessage.hasAnInvalidFormat
        );
    }

    private topLevelCountryCodeHasAnInvalidFormat(): boolean {
        const isInvalidFormat: boolean = this.countryCode
            ? !EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE.includes(this.countryCode)
            : false;
        
        return isInvalidFormat;
    }
}
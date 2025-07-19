import { EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "../../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import type { EmailTopLevelDomainCountryCode } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import EmailDomainPartValidator from "./EmailDomainPartValidator";

export default class EmailDomainCountryCodeValidator extends EmailDomainPartValidator {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email domain country code");

    protected isRequired: boolean = false;

    constructor(private countryCode: Maybe<EmailTopLevelDomainCountryCode>) {
        super(countryCode);

        this.validate();
    }

    protected hasAnInvalidFormat(): boolean {
        if (this.countryCode)
            return !EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE.includes(this.countryCode);

        return false;
    }
}
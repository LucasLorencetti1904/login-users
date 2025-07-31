import EmailDomainPartValidator from "@validators/userData/email/domain/EmailDomainPartValidator";
import type { Maybe } from "@shared/types/optionalTypes";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "@shared/constants/emailDomains";
import type { EmailTopLevelDomainCountryCode } from "@shared/types/emailDomainTypes";

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
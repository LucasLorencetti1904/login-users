import EmailDomainPartValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainPartValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "@shared/constants/email/emailDomains";

export default class EmailDomainCountryCodeValidator extends EmailDomainPartValidator {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email domain country code");

    protected isRequired: boolean = false;

    protected hasAnInvalidFormat(countryCode: string): boolean {
        if (countryCode)
            return !EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE.includes(countryCode);

        return false;
    }
}
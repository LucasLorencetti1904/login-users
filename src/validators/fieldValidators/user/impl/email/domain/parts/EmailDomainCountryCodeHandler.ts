import EmailDomainSubPartsHandler from "@validators/fieldValidators/user/impl/email/domain/base/EmailDomainSubPartsHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "@shared/constants/email/emailDomains";

export default class EmailDomainCountryCodeHandler extends EmailDomainSubPartsHandler {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email domain country code");

    protected isRequired: boolean = false;

    protected hasAnInvalidFormat(countryCode: string): boolean {
        return Boolean(countryCode) && !EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE.includes(countryCode);
    }
}
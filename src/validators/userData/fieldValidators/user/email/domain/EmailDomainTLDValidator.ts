import EmailDomainPartValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainPartValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_TOP_LEVEL_DOMAIN } from "@shared/constants/email/emailDomains";

export default class EmailDomainTLDValidator extends EmailDomainPartValidator {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email top level domain");

    protected isRequired: boolean = true;

    protected hasAnInvalidFormat(TLD: string): boolean {
        return !EMAIL_TOP_LEVEL_DOMAIN.includes(TLD);
    }
}
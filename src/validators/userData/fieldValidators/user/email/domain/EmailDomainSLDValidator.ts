import EmailDomainPartValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainPartValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_SECOND_LEVEL_DOMAIN } from "@shared/constants/email/emailDomains";

export default class EmailDomainSLDValidator extends EmailDomainPartValidator {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email second level domain");

    protected isRequired: boolean = true;

    protected hasAnInvalidFormat(SLD: string): boolean {
        return !EMAIL_SECOND_LEVEL_DOMAIN.includes(SLD);
    }
}
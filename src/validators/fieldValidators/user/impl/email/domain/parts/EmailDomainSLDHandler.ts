import EmailDomainSubPartsHandler from "@validators/fieldValidators/user/impl/email/domain/base/EmailDomainSubPartsHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_SECOND_LEVEL_DOMAIN } from "@shared/constants/email/emailDomains";

export default class EmailDomainSLDHandler extends EmailDomainSubPartsHandler {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email second level domain");

    protected isRequired: boolean = true;

    protected hasAnInvalidFormat(SLD: string): boolean {
        return !EMAIL_SECOND_LEVEL_DOMAIN.includes(SLD);
    }
}
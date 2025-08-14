import EmailDomainSubPartsHandler from "@validators/fieldValidators/user/impl/email/domain/base/EmailDomainSubPartsHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_TOP_LEVEL_DOMAIN } from "@shared/constants/email/emailDomains";

export default class EmailDomainTLDHandler extends EmailDomainSubPartsHandler {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email top level domain");

    protected isRequired: boolean = true;

    protected hasAnInvalidFormat(TLD: string): boolean {
        return !EMAIL_TOP_LEVEL_DOMAIN.includes(TLD);
    }
}
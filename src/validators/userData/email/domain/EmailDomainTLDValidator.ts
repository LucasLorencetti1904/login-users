import EmailDomainPartValidator from "@validators/userData/email/domain/EmailDomainPartValidator";
import type { Maybe } from "@shared/types/optionalTypes";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import { EMAIL_TOP_LEVEL_DOMAIN } from "@shared/constants/emailDomains";
import type { EmailTopLevelDomain } from "@shared/types/emailDomainTypes";

export default class EmailDomainTLDValidator extends EmailDomainPartValidator {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email top level domain");

    protected isRequired: boolean = true;

    constructor(private TLD: Maybe<EmailTopLevelDomain>) {
        super(TLD);

        this.validate();
    }

    protected hasAnInvalidFormat(): boolean {
        return !EMAIL_TOP_LEVEL_DOMAIN.includes(this.TLD as string);
    }
}
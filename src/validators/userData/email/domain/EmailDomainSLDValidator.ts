import EmailDomainPartValidator from "@validators/userData/email/domain/EmailDomainPartValidator";
import type { Maybe } from "@shared/types/optionalTypes";
import ErrorMessageGenerator from "@shared/errors/ErrorMessageGenerator";
import { EMAIL_SECOND_LEVEL_DOMAIN } from "@shared/constants/emailDomains";
import type { EmailSecondLevelDomain } from "@shared//types/emailDomainTypes";

export default class EmailDomainSLDValidator extends EmailDomainPartValidator {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email second level domain");

    protected isRequired: boolean = true;

    constructor(private SLD: Maybe<EmailSecondLevelDomain>) {
        super(SLD);

        this.validate();
    }

    protected hasAnInvalidFormat(): boolean {
        return !EMAIL_SECOND_LEVEL_DOMAIN.includes(this.SLD as string);
    }
}
import { EMAIL_SECOND_LEVEL_DOMAIN } from "../../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import type { EmailSecondLevelDomain } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import EmailDomainPartValidator from "./EmailDomainPartValidator";

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
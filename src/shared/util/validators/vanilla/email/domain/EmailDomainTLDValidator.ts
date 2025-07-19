import { EMAIL_TOP_LEVEL_DOMAIN } from "../../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import type { EmailTopLevelDomain } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import EmailDomainPartValidator from "./EmailDomainPartValidator";

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
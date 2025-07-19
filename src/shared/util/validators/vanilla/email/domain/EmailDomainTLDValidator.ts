import { EMAIL_TOP_LEVEL_DOMAIN } from "../../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import type { EmailTopLevelDomain } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import { EmailValidationError } from "../../../../errors/DataValidationError";
import VanillaDataValidator from "../../VanillaDataValidator";

export default class EmailDomainTLDValidator extends VanillaDataValidator<EmailValidationError> {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email top level domain");

    constructor(private TLD: Maybe<EmailTopLevelDomain>) {
        super(TLD);

        this.validate();
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.hasAnInvalidFormat(), this.errorMessage.hasAnInvalidFormat
        );
    }

    private hasAnInvalidFormat(): boolean {
        const isInvalidFormat: boolean = this.TLD
            ? !EMAIL_TOP_LEVEL_DOMAIN.includes(this.TLD)
            : true;

        return isInvalidFormat;
    }
}
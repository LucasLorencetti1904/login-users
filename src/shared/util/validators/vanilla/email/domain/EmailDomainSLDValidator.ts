import { EMAIL_SECOND_LEVEL_DOMAIN } from "../../../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import type { EmailSecondLevelDomain } from "../../../../../types/emailDomainTypes";
import type { Maybe } from "../../../../../types/optionalTypes";
import { EmailValidationError } from "../../../../errors/DataValidationError";
import VanillaDataValidator from "../../VanillaDataValidator";

export default class EmailDomainSLDValidator extends VanillaDataValidator<EmailValidationError> {
    protected errorMessage: ErrorMessageGenerator =
        ErrorMessageGenerator.initWithDataName("Email second level domain");

    constructor(private SLD: Maybe<EmailSecondLevelDomain>) {
        super(SLD);

        this.validate();
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.secondLevelHasAnInvalidFormat(), this.errorMessage.hasAnInvalidFormat 
        );
    }

    private secondLevelHasAnInvalidFormat(): boolean {
        const isInvalidFormat: boolean = this.SLD
        ? !EMAIL_SECOND_LEVEL_DOMAIN.includes(this.SLD)
        : true;

        return isInvalidFormat;
    }
}
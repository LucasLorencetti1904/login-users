import type ErrorMessageGenerator from "../../../../../helpers/ErrorMessageGenerator";
import type { Maybe } from "../../../../../types/optionalTypes";
import { EmailValidationError } from "../../../../errors/DataValidationError";
import VanillaDataValidator from "../../VanillaDataValidator";

export default abstract class EmailDomainPartValidator extends VanillaDataValidator<EmailValidationError> {
    protected abstract errorMessage: ErrorMessageGenerator;

    protected abstract isRequired: boolean;

    constructor(protected data: Maybe<string>) {
        super(data);
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.isInvalid(), this.errorMessage.hasAnInvalidFormat
        );
    }

    private isInvalid(): boolean {
        return this.isMissing() || this.hasAnInvalidFormat();
    }
    
    private isMissing(): boolean {
        return this.isRequired && this.isEmpty();
    }

    private isEmpty(): boolean {
        return !this.data;
    }

    protected abstract hasAnInvalidFormat(): boolean;
}
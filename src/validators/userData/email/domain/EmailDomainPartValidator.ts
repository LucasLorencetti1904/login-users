import UserDataValidator from "@validators/userData/UserDataValidator";
import type { Maybe } from "@shared/types/optionalTypes";
import type ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default abstract class EmailDomainPartValidator extends UserDataValidator {
    protected abstract errorMessage: ErrorMessageGenerator;

    protected abstract isRequired: boolean;

    constructor(protected data: Maybe<string>) {
        super(data);
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
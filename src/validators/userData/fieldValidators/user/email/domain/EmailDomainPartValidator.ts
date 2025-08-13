import UserDataValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import type ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default abstract class EmailDomainPartValidator extends UserDataValidator {
    protected abstract errorMessage: ErrorMessageGenerator;

    protected abstract isRequired: boolean;

    public validate(domainPart: string): void {
        this.failsIf (
            this.isInvalid(domainPart), this.errorMessage.hasAnInvalidFormat
        );
    }

    private isInvalid(domainPart: string): boolean {
        return this.isMissing(domainPart) || this.hasAnInvalidFormat(domainPart);
    }
    
    private isMissing(domainPart: string): boolean {
        return this.isRequired && this.isEmpty(domainPart);
    }

    private isEmpty(domainPart: string): boolean {
        return !domainPart;
    }

    protected abstract hasAnInvalidFormat(domainPart: string): boolean;
}
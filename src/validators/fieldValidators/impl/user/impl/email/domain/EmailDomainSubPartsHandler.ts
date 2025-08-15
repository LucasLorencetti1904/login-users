import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";
import type ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import failsIf from "@shared/utils/failsIf";

export default abstract class EmailDomainSubPartsHandler implements EmailPartHandler {
    protected abstract errorMessage: ErrorMessageGenerator;

    protected abstract isRequired: boolean;

    public handle(domainPart: string): void {
        failsIf (
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
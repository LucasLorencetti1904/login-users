import { Mock, vi } from "vitest";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import EmailDomainSubPartsHandler from "@validators/fieldValidators/user/impl/email/domain/base/EmailDomainSubPartsHandler";

export default abstract class MockEmailDomainSubPartsHandler extends EmailDomainSubPartsHandler {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("mock");
    
    public handle: Mock = vi.fn();

    protected hasAnInvalidFormat: Mock = vi.fn();

    protected isRequired: boolean = true;

    public willFail(): void {
        this.handle.mockImplementation(() => {
            throw new Error();
        });
    }
}
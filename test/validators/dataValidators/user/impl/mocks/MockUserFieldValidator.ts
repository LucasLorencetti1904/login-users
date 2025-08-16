import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import { Mock, vi } from "vitest";

export default class MockUserFieldValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("mock");
    protected handleStringField: Mock = vi.fn();
    protected failsIf: Mock = vi.fn();

    public validate: Mock = vi.fn();

    public willPass(): void {
        this.validate.mockImplementation(() => {});
    }

    public willFail(): void {
        this.validate.mockImplementation(() => {
            throw new Error();
        });
    }
}
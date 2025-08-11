import { Mock, vi } from "vitest";
import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default class MockNameValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("test");

    protected failsIf: Mock = vi.fn();
    public validate: Mock = vi.fn();

    public willFail(): void {
        this.validate.mockImplementation(() => {
            throw new Error();
        });
    }
}
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import { Mock, vi } from "vitest";

export default abstract class MockFieldValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("mock");
    protected failsIf: Mock = vi.fn();
    protected handleStringField: Mock = vi.fn();
    public validate: Mock = vi.fn();
}
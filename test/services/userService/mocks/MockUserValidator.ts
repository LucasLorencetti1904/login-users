import { expect, Mock, vi } from "vitest";
import type UserValidator from "@interfaces/validators/Validator";

export default abstract class MockUserValidator implements UserValidator {
    public validate = vi.fn();

    public willFail(): void {
        this.validate.mockImplementation(() => {
            throw new Error();
        });
    }

    public abstract callWith(data: unknown): void

    public doNotCall(): void {
        expect (this.validate as Mock).not.toHaveBeenCalled();
    }
}
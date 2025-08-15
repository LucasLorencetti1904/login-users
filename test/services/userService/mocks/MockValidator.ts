import { expect, Mock, vi } from "vitest";
import type UserValidator from "@interfaces/validators/Validator";
import type UserCreateRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";

export default class MockValidator implements UserValidator {
    public validate = vi.fn();

    public willFail(): void {
        this.validate.mockImplementation(() => {
            throw new Error();
        });
    }

    public callWith(data: UserCreateRequestDTO): void {
        expect (this.validate as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }

    public doNotCall(): void {
        expect (this.validate as Mock).not.toHaveBeenCalled();
    }
}
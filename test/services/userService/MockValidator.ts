import { expect, Mock, vi } from "vitest";
import type UserValidator from "@interfaces/validators/UserValidator";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";

export default class MockValidator implements UserValidator {
    public validate = vi.fn();

    public willFail(): void {
        this.validate.mockImplementation(() => {
            throw new Error();
        });
    }

    public callWith(data: UserRequestDTO): void {
        expect (this.validate as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }

    public doNotCall(): void {
        expect (this.validate as Mock).not.toHaveBeenCalled();
    }
}
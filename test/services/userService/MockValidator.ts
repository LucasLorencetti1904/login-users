import { expect, Mock, vi } from "vitest";
import UserValidator from "@interfaces/validators/UserValidator";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";

export default class MockValidator implements UserValidator {
    public validate = vi.fn();

    public callValidateMethodWith(data: UserRequestDTO): void {
        expect (this.validate as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }
}
import { expect, Mock } from "vitest";
import MockUserValidator from "./MockUserValidator";
import type UpdateUserRequestDTO from "@DTOs/UserDTO/UpdateUserRequestDTO";

export default class MockUpdateUserValidator extends MockUserValidator {
    public callWith(data: UpdateUserRequestDTO): void {
        expect (this.validate as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }
}
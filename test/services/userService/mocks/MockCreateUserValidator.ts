import { expect, Mock } from "vitest";
import MockUserValidator from "./MockUserValidator";
import type { CreateUserRequestDTO } from "@DTOs/UserDTO/CreateUserDTO";

export default class MockCreateUserValidator extends MockUserValidator {
    public callWith(data: CreateUserRequestDTO): void {
        expect (this.validate as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }
}
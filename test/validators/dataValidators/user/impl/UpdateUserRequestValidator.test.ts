import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import MockUsernameValidator from "./mocks/MockUsernameValidator";
import MockFirstNameValidator from "./mocks/MockFirstNameValidator";
import MockLastNameValidator from "./mocks/MockLastNameValidator";
import MockBirthDateValidator from "./mocks/MockBirthDateValidator";
import MockEmailValidator from "./mocks/MockEmailValidator";
import MockPasswordValidator from "./mocks/MockPasswordValidator";
import UpdateUserRequestValidator from "@validators/dataValidators/UpdateUserRequestValidator";

let userDTO: UpdateUserRequestDTO;

let mockUsernameValidator: MockUsernameValidator;
let mockFirstNameValidator: MockFirstNameValidator;
let mockLastNameValidator: MockLastNameValidator;
let mockBirthDateValidator: MockBirthDateValidator;
let mockEmailValidator: MockEmailValidator;
let mockPasswordValidator: MockPasswordValidator;

let mockFieldValidators: MockUsernameValidator[];

let validator: UpdateUserRequestValidator;

describe ("Create User Request Validator Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        userDTO = {
            username: "user_example123",
            firstName: "User",
            lastName: "Example",
            birthDate: "2005-04-19",
            email: "userexample@gmail.com",
            password: "UserExample12345!*"
        };

        mockUsernameValidator = new MockUsernameValidator("username"),
        mockFirstNameValidator = new MockFirstNameValidator("firstName"),
        mockLastNameValidator = new MockLastNameValidator("lastName"),
        mockBirthDateValidator = new MockBirthDateValidator("birthDate"),
        mockEmailValidator = new MockEmailValidator("email"),
        mockPasswordValidator = new MockPasswordValidator("password")

        mockFieldValidators = [
            mockUsernameValidator,
            mockFirstNameValidator,
            mockLastNameValidator,
            mockBirthDateValidator,
            mockEmailValidator,
            mockPasswordValidator
        ];

        validator = new UpdateUserRequestValidator(mockFieldValidators);

        mockFieldValidators.forEach((fieldValidator) => {
            fieldValidator.willPass();
        });

    });

    it ("returns nothing when user fields is not undefined and is valid.", () => {
        expect (() => validator.validate(userDTO)).not.toThrowError();
    });

    it ("returns nothing when user fields is undefined.", () => {
        userDTO = {
            ...userDTO,
            username: undefined,
            email: undefined
        };

        expect (() => validator.validate({})).not.toThrowError();
    });

    it ("throws error when username is not undefined and is invalid.", () => {
        mockUsernameValidator.willFail();
        userDTO.username = "User Example";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when firt name is not undefined and is invalid.", () => {
        mockFirstNameValidator.willFail();
        userDTO.firstName = "Us3r";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when last name is not undefined and invalid.", () => {
        mockLastNameValidator.willFail();
        userDTO.lastName = "Ex4mple";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when birth date is not undefined and is invalid.", () => {
        mockBirthDateValidator.willFail();
        userDTO.birthDate = "19/04/2005";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when email is not undefined and is invalid.", () => {
        mockEmailValidator.willFail();
        userDTO.email = "userexample@gm41l,com";
        
        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when password is not undefined and is invalid.", () => {
        mockPasswordValidator.willFail();
        userDTO.password = "12345";

        expect (() => validator.validate(userDTO)).toThrowError();
    });
});
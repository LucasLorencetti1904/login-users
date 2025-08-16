import { beforeEach, describe, expect, it, vi } from "vitest";
import UserCreateRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";
import CreateUserDataValidator from "@validators/dataValidators/UserRequestValidator";
import MockUsernameValidator from "./mocks/MockUsernameValidator";
import MockFirstNameValidator from "./mocks/MockFirstNameValidator";
import MockLastNameValidator from "./mocks/MockLastNameValidator";
import MockBirthDateValidator from "./mocks/MockBirthDateValidator";
import MockEmailValidator from "./mocks/MockEmailValidator";
import MockPasswordValidator from "./mocks/MockPasswordValidator";
import CreateUserRequestValidator from "@validators/dataValidators/CreateUserRequestValidator";

const userDTO: UserCreateRequestDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: "2005-04-19",
    email: "userexample@gmail.com",
    password: "UserExample12345!*"
};

let mockUsernameValidator: MockUsernameValidator;
let mockFirstNameValidator: MockFirstNameValidator;
let mockLastNameValidator: MockLastNameValidator;
let mockBirthDateValidator: MockBirthDateValidator;
let mockEmailValidator: MockEmailValidator;
let mockPasswordValidator: MockPasswordValidator;

let mockFieldValidators: MockUsernameValidator[];

let validator: CreateUserDataValidator;

describe ("Create User Request Validator Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();

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

        validator = new CreateUserRequestValidator(mockFieldValidators);

        mockFieldValidators.forEach((fieldValidator) => {
            fieldValidator.willPass();
        });

    });

    it ("returns nothing when user data is valid.", () => {
        expect (() => validator.validate(userDTO)).not.toThrowError();
    });

    it ("throws error when username is invalid.", () => {
        mockUsernameValidator.willFail();
        userDTO.username = "User Example";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when firt name is invalid.", () => {
        mockFirstNameValidator.willFail();
        userDTO.firstName = "Us3r";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when last name is invalid.", () => {
        mockLastNameValidator.willFail();
        userDTO.lastName = "Ex4mple";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when birth date is invalid.", () => {
        mockBirthDateValidator.willFail();
        userDTO.birthDate = "19/04/2005";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when email is invalid.", () => {
        mockEmailValidator.willFail();
        userDTO.email = "userexample@gm41l,com";
        
        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when password is invalid.", () => {
        mockPasswordValidator.willFail();
        userDTO.password = "12345";

        expect (() => validator.validate(userDTO)).toThrowError();
    });
});
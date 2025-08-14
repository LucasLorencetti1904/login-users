import { beforeEach, describe, expect, it, vi } from "vitest";
import UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import CreateUserDataValidator from "@validators/generalValidators/UserRequestValidator";
import MockUsernameValidator from "../mocks/MockUsernameValidator";
import MockNameValidator from "../mocks/MockNameValidator";
import MockBirthDateValidator from "../mocks/MockBirthDateValidator";
import MockEmailValidator from "../mocks/MockEmailValidator";
import MockPasswordValidator from "../mocks/MockPasswordValidator";
import UserFieldValidator from "@validators/fieldValidators/user/abstract/UserFieldValidator";

let userDTO: UserCreateRequestDTO;

type FieldAndValidatorsFactory = (data: UserCreateRequestDTO) => [any, any][]
const mockFieldsAndValidators: FieldAndValidatorsFactory = (data: UserCreateRequestDTO): [any, any][] => {
    return [
        [data.username, MockUsernameValidator as unknown as UserFieldValidator],
        [data.firstName, MockNameValidator as unknown as UserFieldValidator],
        [data.lastName, MockNameValidator as unknown as UserFieldValidator],
        [data.birthDate, MockBirthDateValidator as unknown as UserFieldValidator],
        [data.email, MockEmailValidator as unknown as UserFieldValidator],
        [data.password, MockPasswordValidator as unknown as UserFieldValidator]
    ];
};

let validator: CreateUserDataValidator;

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

        validator = new CreateUserDataValidator(mockFieldsAndValidators);

        MockUsernameValidator.willPass();
        MockNameValidator.willPass();
        MockBirthDateValidator.willPass();
        MockEmailValidator.willPass();
        MockPasswordValidator.willPass();
    });

    it ("returns nothing when user data is valid.", () => {
        expect (() => validator.validate(userDTO)).not.toThrowError();
    });

    it ("throws error when username is invalid.", () => {
        MockUsernameValidator.willFail();
        userDTO.username = "User Example";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when firt name is invalid.", () => {
        MockNameValidator.willFail();
        userDTO.firstName = "Us3r";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when last name is invalid.", () => {
        MockNameValidator.willFail();
        userDTO.lastName = "Ex4mple";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when birth date is invalid.", () => {
        MockBirthDateValidator.willFail();
        userDTO.birthDate = "19/04/2005";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when email is invalid.", () => {
        MockEmailValidator.willFail();
        userDTO.email = "userexample@gm41l,com";
        
        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when password is invalid.", () => {
        MockPasswordValidator.willFail();
        userDTO.password = "12345";

        expect (() => validator.validate(userDTO)).toThrowError();
    });
});
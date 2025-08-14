import { beforeEach, describe, expect, it, vi } from "vitest";
import UserUpdateRequestDTO from "@DTOs/UserDTO/UserUpdateRequestDTO";
import UpdateUserDataValidator from "@validators/userData/generalValidators/UpdateUserDataValidator";
import MockUsernameValidator from "../mocks/MockUsernameValidator";
import MockNameValidator from "../mocks/MockNameValidator";
import MockBirthDateValidator from "../mocks/MockBirthDateValidator";
import UserFieldValidator from "@validators/fieldValidators/user/abstract/UserFieldValidator";

let userDTO: UserUpdateRequestDTO;

type FieldAndValidatorsFactory = (data: UserUpdateRequestDTO) => [any, any][]
const mockFieldsAndValidators: FieldAndValidatorsFactory = (data: UserUpdateRequestDTO): [any, any][] => {
    return [
        [data.username, MockUsernameValidator as unknown as UserFieldValidator],
        [data.firstName, MockNameValidator as unknown as UserFieldValidator],
        [data.lastName, MockNameValidator as unknown as UserFieldValidator],
        [data.birthDate, MockBirthDateValidator as unknown as UserFieldValidator]
    ];
};

let validator: UpdateUserDataValidator;

describe ("Create User Request Validator Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        userDTO = {
            username: "user_example123",
            firstName: "User",
            lastName: "Example",
            birthDate: "2005-04-19"
        };

        validator = new UpdateUserDataValidator(mockFieldsAndValidators);

        MockUsernameValidator.willPass();
        MockNameValidator.willPass();
        MockBirthDateValidator.willPass();
    });

    it ("returns nothing when defined user data is valid.", () => {
        expect (() => validator.validate(userDTO)).not.toThrowError();
    });

    it ("returns nothing when user data is undefined.", () => {
        MockUsernameValidator.wasNotCalled();
        MockNameValidator.wasNotCalled();
        MockBirthDateValidator.wasNotCalled();

        for (let field in userDTO) {
            (userDTO as any)[field] = undefined;
        }

        expect (() => validator.validate(userDTO)).not.toThrowError();
    });

    it ("throws error when defined username is invalid.", () => {
        MockUsernameValidator.willFail();
        userDTO.username = "User Example";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when defined firt name is invalid.", () => {
        MockNameValidator.willFail();
        userDTO.firstName = "Us3r";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when defined last name is invalid.", () => {
        MockNameValidator.willFail();
        userDTO.lastName = "Ex4mple";

        expect (() => validator.validate(userDTO)).toThrowError();
    });

    it ("throws error when defined birth date is invalid.", () => {
        MockBirthDateValidator.willFail();
        userDTO.birthDate = "19/04/2005";

        expect (() => validator.validate(userDTO)).toThrowError();
    });
});
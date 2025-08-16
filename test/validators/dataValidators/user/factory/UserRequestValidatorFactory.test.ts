import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRequestValidatorFactory from "@validators/dataValidators/factory/UserRequestValidatorFactory";
import MockFieldValidator1 from "./mocks/MockFieldValidator1";
import MockFieldValidator2 from "./mocks/MockFieldValidator2";
import MockFieldValidator from "./mocks/MockFieldValidator";

let factory: UserRequestValidatorFactory;

let arrayWithFieldValidators: MockFieldValidator[];

describe ("User Request Validator Factory Test.", () => {
    beforeEach (() => {
        vi.fn();

        arrayWithFieldValidators = [
            new MockFieldValidator1("mock"),
            new MockFieldValidator2("mock")
        ];

        factory = UserRequestValidatorFactory.initWithFieldValidators(arrayWithFieldValidators);
    });

    it ("inits factory with received field validators.", () => {
        expect (factory).toBeInstanceOf(UserRequestValidatorFactory);
    });

    it ("returns a CreateUserRequestValidator with received field validators.", () => {
        const createUserRequestValidator: any = factory.buildCreateUserRequestValidator();

        expect (createUserRequestValidator).toHaveProperty("validate");
    });

    it ("returns a UpdateUserRequestValidator with received field validator.", () => {
        const updateUserRequestValidator: any = factory.buildUpdateUserRequestValidator();

        expect (updateUserRequestValidator).toHaveProperty("validate");
    });
}); 
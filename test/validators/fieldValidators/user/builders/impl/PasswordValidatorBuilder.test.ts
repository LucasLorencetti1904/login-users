import { beforeEach, describe, expect, it, vi } from "vitest";
import PasswordValidatorBuilder from "@validators/fieldValidators/user/builders/impl/PasswordValidatorBuilder";

let builder: PasswordValidatorBuilder;

let result: any;

describe ("Password Validator Builder Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        builder = new PasswordValidatorBuilder();
    });

    it ("throws error when field name is missing.", () => {
        result = () => (
            builder
                .build()
        );

        expect (result).toThrowError();
    });

    it ("returns a PasswordValidator when all dependecies is received.", () => {
        result = (
            builder
                .defineFieldName("password")
                .build()
        );

        expect (result.fieldName && result.fieldName == "password").toBe(true);
    });
});
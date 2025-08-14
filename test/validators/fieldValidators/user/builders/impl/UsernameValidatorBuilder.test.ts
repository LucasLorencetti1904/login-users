import { beforeEach, describe, expect, it, vi } from "vitest";
import UsernameValidatorBuilder from "@validators/fieldValidators/user/builders/impl/UsernameValidatorBuilder";

let builder: UsernameValidatorBuilder;

let result: any;

describe ("Username Validator Builder Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        builder = new UsernameValidatorBuilder();
    });

    it ("throws error when field name is missing.", () => {
        result = () => (
            builder
                .build()
        );

        expect (result).toThrowError();
    });

    it ("returns a UsernameValidator when all dependecies is received.", () => {
        result = (
            builder
                .addFieldName("username")
                .build()
        );

        expect (result.fieldName && result.fieldName == "username").toBe(true);
    });
});
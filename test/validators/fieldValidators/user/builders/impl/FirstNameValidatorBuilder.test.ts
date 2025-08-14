import { beforeEach, describe, expect, it, vi } from "vitest";
import FirstNameValidatorBuilder from "@validators/fieldValidators/user/builders/impl/FirstNameValidatorBuilder";

let builder: FirstNameValidatorBuilder;

let result: any;

describe ("First Name Validator Builder Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        builder = new FirstNameValidatorBuilder();
    });

    it ("throws error when field name is missing.", () => {
        result = () => (
            builder
                .build()
        );

        expect (result).toThrowError();
    });

    it ("returns a FistNameValidator when all dependecies is received.", () => {
        result = (
            builder
                .addFieldName("firstName")
                .build()
        );

        expect (result.fieldName && result.fieldName == "firstName").toBe(true);
    });
});
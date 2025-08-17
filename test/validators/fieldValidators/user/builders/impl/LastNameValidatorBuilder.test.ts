import { beforeEach, describe, expect, it, vi } from "vitest";
import LastNameValidatorBuilder from "@validators/fieldValidators/impl/user/builders/LastNameValidatorBuilder";

let builder: LastNameValidatorBuilder;

let result: any;

describe ("Last Name Validator Builder Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        builder = new LastNameValidatorBuilder();
    });

    it ("throws error when field name is missing.", () => {
        result = () => (
            builder
                .build()
        );

        expect (result).toThrowError();
    });

    it ("returns a LastNameValidator when all dependecies is received.", () => {
        result = (
            builder
                .defineFieldName("lastName")
                .build()
        );

        expect (result.fieldName && result.fieldName == "lastName").toBe(true);
    });
});
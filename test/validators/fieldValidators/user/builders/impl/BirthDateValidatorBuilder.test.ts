import { beforeEach, describe, expect, it, vi } from "vitest";
import BirthDateValidatorBuilder from "@validators/fieldValidators/user/builders/impl/BirthDateValidatorBuilder";

let builder: BirthDateValidatorBuilder;

let result: any;

describe ("Birth Date Validator Builder Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        builder = new BirthDateValidatorBuilder();
    });

    it ("throws error when field name is missing.", () => {
        result = () => (
            builder
                .build()
        );

        expect (result).toThrowError();
    });

    it ("returns a BirthDateValidator when all dependecies is received.", () => {
        result = (
            builder
                .addFieldName("birthDate")
                .build()
        );

        expect (result.fieldName && result.fieldName == "birthDate").toBe(true);
    });
});
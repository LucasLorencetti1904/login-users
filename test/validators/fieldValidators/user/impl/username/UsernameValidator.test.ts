import { vi, describe, beforeEach, it, expect } from "vitest";
import UsernameValidator from "@validators/fieldValidators/impl/user/impl/username/UsernameValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "username";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Username");

let validator: UsernameValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = UsernameValidator.initWithFieldName("username");
    });

    it (`returns a 'UsernameValidator' instance when factory method is called.`, () => {
        expect (validator).toBeInstanceOf(UsernameValidator);
    });

    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("XxL3M4OxX")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate(""))
            .toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} starts with a number.`, () => {
        expect (() => validator.validate("1XxL3M4OXx"))
            .toThrow(errorMessage.startsWith("numbers"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => validator.validate("XxL"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 10 characters.`, () => {
        expect (() => validator.validate("XxL3M4OXxxx"))
            .toThrow(errorMessage.maxLength(10));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => validator.validate("XxL3 M4OXx"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`${errorTestDescriptionPrefix} contains special characters.`, () => {
        expect (() => validator.validate("XxL3*M4OXx"))
            .toThrow(errorMessage.contains("special characters"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => validator.validate("1XxL3*M4O Xxxx"))
        .toThrow(errorMessage.startsWith("numbers"));
    }); 
});
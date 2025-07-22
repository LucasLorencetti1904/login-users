import ErrorMessageGenerator from "../../../src/shared/helpers/ErrorMessageGenerator";
import UsernameValidator from "../../../src/shared/util/validators/vanilla/username/UsernameValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "username";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Username");

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new UsernameValidator("XxL3M4OxX")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => new UsernameValidator(""))
            .toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} starts with a number.`, () => {
        expect (() => new UsernameValidator("1XxL3M4OXx"))
            .toThrow(errorMessage.startsWith("numbers"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => new UsernameValidator("XxL"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 10 characters.`, () => {
        expect (() => new UsernameValidator("XxL3M4OXxxx"))
            .toThrow(errorMessage.maxLength(10));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => new UsernameValidator("XxL3 M4OXx"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`${errorTestDescriptionPrefix} contains special characters.`, () => {
        expect (() => new UsernameValidator("XxL3*M4OXx"))
            .toThrow(errorMessage.contains("special characters"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new UsernameValidator("1XxL3*M4O Xxxx"))
        .toThrow(errorMessage.startsWith("numbers"));
    }); 
});
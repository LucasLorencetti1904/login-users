import ErrorMessageGenerator from "../../src/shared/helpers/ErrorMessageGenerator";
import UsernameValidator from "../../src/shared/util/validators/vanilla/username/UsernameValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "Username";

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName(propertyName);

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new UsernameValidator("XxL3M4OxX")).not.toThrowError();
    });

    it (`throws a error message when ${propertyName} is or empty.`, () => {
        expect (() => new UsernameValidator(""))
            .toThrow(errorMessage.isEmpty);
    });

    it (`throws a error message when ${propertyName} starts with a number.`, () => {
        expect (() => new UsernameValidator("1XxL3M4OXx"))
            .toThrow(errorMessage.startsWith("numbers"));
    });

    it (`throws a error message when ${propertyName} contains less then 4 characters.`, () => {
        expect (() => new UsernameValidator("XxL"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`throws a error message when ${propertyName} contains more then 10 characters.`, () => {
        expect (() => new UsernameValidator("XxL3M4OXxxx"))
            .toThrow(errorMessage.maxLength(10));
    });

    it (`throws a error message when ${propertyName} contains spaces.`, () => {
        expect (() => new UsernameValidator("XxL3 M4OXx"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`throws a error message when ${propertyName} contains special characters.`, () => {
        expect (() => new UsernameValidator("XxL3*M4OXx"))
            .toThrow(errorMessage.contains("special characters"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new UsernameValidator("1XxL3*M4O Xxxx"))
        .toThrow(errorMessage.startsWith("numbers"));
    }); 
});
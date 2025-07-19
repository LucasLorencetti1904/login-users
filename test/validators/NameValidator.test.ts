import ErrorMessageGenerator from "../../src/shared/helpers/ErrorMessageGenerator";
import NameValidator from "../../src/shared/util/validators/vanilla/name/NameValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "Name";

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName(propertyName);

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new NameValidator("User")).not.toThrowError();
    });

    it (`throws a error message when ${propertyName} is or empty.`, () => {
        expect (() => new NameValidator(""))
            .toThrow(errorMessage.isEmpty);
    });

    it (`throws a error message when ${propertyName} contains number.`, () => {
        expect (() => new NameValidator("User1"))
            .toThrow(errorMessage.contains("numbers"));
    });

    it (`throws a error message when ${propertyName} contains less then 4 characters.`, () => {
        expect (() => new NameValidator("Usr"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`throws a error message when ${propertyName} contains more then 14 characters.`, () => {
        expect (() => new NameValidator("ThisIsMyUserExample"))
            .toThrow(errorMessage.maxLength(14));
    });

    it (`throws a error message when ${propertyName} contains spaces.`, () => {
        expect (() => new NameValidator("Us er"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`throws a error message when ${propertyName} contains special characters.`, () => {
        expect (() => new NameValidator("User_"))
            .toThrow(errorMessage.contains("special characters"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new NameValidator("This is My User Example 1"))
            .toThrow(errorMessage.contains("numbers"));
    }); 
});
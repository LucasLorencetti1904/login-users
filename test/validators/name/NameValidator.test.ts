import ErrorMessageGenerator from "../../../src/shared/helpers/ErrorMessageGenerator";
import NameValidator from "../../../src/shared/util/validators/vanilla/name/NameValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "Name";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName(propertyName);

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`${errorTestDescriptionPrefix} is valid.`, () => {
        expect (() => new NameValidator("User")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is or empty.`, () => {
        expect (() => new NameValidator(""))
            .toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} contains number.`, () => {
        expect (() => new NameValidator("User1"))
            .toThrow(errorMessage.contains("numbers"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => new NameValidator("Usr"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 14 characters.`, () => {
        expect (() => new NameValidator("ThisIsMyUserExample"))
            .toThrow(errorMessage.maxLength(14));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => new NameValidator("Us er"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`${errorTestDescriptionPrefix} contains special characters.`, () => {
        expect (() => new NameValidator("User_"))
            .toThrow(errorMessage.contains("special characters"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new NameValidator("This is My User Example 1"))
            .toThrow(errorMessage.contains("numbers"));
    }); 
});
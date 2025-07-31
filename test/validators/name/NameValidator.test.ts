import { vi, describe, beforeEach, it, expect } from "vitest";
import NameValidator from "@validators/userData/name/NameValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

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

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
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
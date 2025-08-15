import { vi, describe, beforeEach, it, expect } from "vitest";
import FirstNameValidator from "@validators/fieldValidators/impl/user/impl/name/FirstNameValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "First name";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName(propertyName);

let validator: FirstNameValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new FirstNameValidator("firstName");
    });
    
    it (`${errorTestDescriptionPrefix} is valid.`, () => {
        expect (() => validator.validate("User")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate(""))
            .toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} contains number.`, () => {
        expect (() => validator.validate("User1"))
            .toThrow(errorMessage.contains("numbers"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => validator.validate("Usr"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 14 characters.`, () => {
        expect (() => validator.validate("ThisIsMyUserExample"))
            .toThrow(errorMessage.maxLength(14));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => validator.validate("Us er"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`${errorTestDescriptionPrefix} contains special characters.`, () => {
        expect (() => validator.validate("User_"))
            .toThrow(errorMessage.contains("special characters"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => validator.validate("This is My User Example 1"))
            .toThrow(errorMessage.contains("numbers"));
    }); 
});
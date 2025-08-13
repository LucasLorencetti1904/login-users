import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailUserValidator from "@validators/userData/fieldValidators/user/email/user/EmailUserValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email user";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email user"); 

let validator: EmailUserValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new EmailUserValidator();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("user")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} starts with a invalid character.`, () => {
        expect (() => validator.validate("1user"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => validator.validate("usr"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 64 characters.`, () => {
        expect (() => validator.validate(
            "useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser"
        )).toThrow(errorMessage.maxLength(64));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => validator.validate("us er"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => validator.validate("4u s"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });
});
import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailUserValidator from "@validators/userData/email/user/EmailUserValidator";
import ErrorMessageGenerator from "@shared/errors/ErrorMessageGenerator";

const propertyName: string = "email user";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email user"); 

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailUserValidator("user")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} starts with a invalid character.`, () => {
        expect (() => new EmailUserValidator("1user"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => new EmailUserValidator("usr"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 64 characters.`, () => {
        expect (() => new EmailUserValidator(
            "useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser"
        )).toThrow(errorMessage.maxLength(64));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => new EmailUserValidator("us er"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new EmailUserValidator("4u s"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });
});
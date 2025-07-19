import EmailUserValidator from "../../../../src/shared/util/validators/vanilla/email/user/EmailUserValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";
import ErrorMessageGenerator from "../../../../src/shared/helpers/ErrorMessageGenerator";

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
});
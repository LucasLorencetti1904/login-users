import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailUserPartHandler from "@validators/fieldValidators/user/impl/email/user/EmailUserPartHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email user";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email user"); 

let handler: EmailUserPartHandler;

describe (propertyName + " handler test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        handler = new EmailUserPartHandler();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => handler.handle("user")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} starts with a invalid character.`, () => {
        expect (() => handler.handle("1user"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });

    it (`${errorTestDescriptionPrefix} contains less then 4 characters.`, () => {
        expect (() => handler.handle("usr"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`${errorTestDescriptionPrefix} contains more then 64 characters.`, () => {
        expect (() => handler.handle(
            "useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser"
        )).toThrow(errorMessage.maxLength(64));
    });

    it (`${errorTestDescriptionPrefix} contains spaces.`, () => {
        expect (() => handler.handle("us er"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => handler.handle("4u s"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });
});
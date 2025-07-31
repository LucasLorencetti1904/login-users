import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailValidator from "@validators/userData/email/EmailValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email"); 

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailValidator("user@gmail.com")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => new EmailValidator("")).toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} number of '@' is not equal to 1.`, () => {
        expect (() => new EmailValidator("userg@@mail.com")).toThrow(errorMessage.hasAnInvalidFormat);
    });

    it (`${errorTestDescriptionPrefix} user is invalid.`, () => {
        expect (() => new EmailValidator("usr@gmail.com")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} domain is invalid.`, () => {
        expect (() => new EmailValidator("user@gnail.com")).toThrowError();
    });
});
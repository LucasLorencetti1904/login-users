import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailValidator from "@validators/userData/fieldValidators/user/email/EmailValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email"); 

let validator: EmailValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new EmailValidator();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("user@gmail.com")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate("")).toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} number of '@' is not equal to 1.`, () => {
        expect (() => validator.validate("userg@@mail.com")).toThrow(errorMessage.hasAnInvalidFormat);
    });

    it (`${errorTestDescriptionPrefix} user is invalid.`, () => {
        expect (() => validator.validate("usr@gmail.com")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} domain is invalid.`, () => {
        expect (() => validator.validate("user@gnail.com")).toThrowError();
    });
});
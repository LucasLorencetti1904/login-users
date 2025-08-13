import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainTLDValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainTLDValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email top level domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
= ErrorMessageGenerator.initWithDataName("Email top level domain"); 

const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

let validator: EmailDomainTLDValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new EmailDomainTLDValidator();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("com")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate("")).toThrow(invalidFormatErrorMessage)
    });

    it (`throw an error when ${propertyName} is invalid.`, () => {
        expect (() => validator.validate("xcom")).toThrow(invalidFormatErrorMessage);
    });
});
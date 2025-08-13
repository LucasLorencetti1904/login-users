import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainSLDValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainSLDValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email second level domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email second level domain"); 

const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

let validator: EmailDomainSLDValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new EmailDomainSLDValidator();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("outlook")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate("")).toThrow(invalidFormatErrorMessage)
    });

    it (`${errorTestDescriptionPrefix} is invalid.`, () => {
        expect (() => validator.validate("gnail")).toThrow(invalidFormatErrorMessage);
    });
});
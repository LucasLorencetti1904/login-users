import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainSLDValidator from "@validators/fieldValidators/user/impl/email/domain/parts/EmailDomainSLDHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email second level domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email second level domain"); 

const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

let handler: EmailDomainSLDValidator;

describe (propertyName + " Handler Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        handler = new EmailDomainSLDValidator();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => handler.handle("outlook")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => handler.handle("")).toThrow(invalidFormatErrorMessage)
    });

    it (`${errorTestDescriptionPrefix} is invalid.`, () => {
        expect (() => handler.handle("gnail")).toThrow(invalidFormatErrorMessage);
    });
});
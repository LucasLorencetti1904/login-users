import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainTLDValidator from "@validators/fieldValidators/user/impl/email/domain/parts/EmailDomainTLDHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email top level domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
= ErrorMessageGenerator.initWithDataName("Email top level domain"); 

const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

let handler: EmailDomainTLDValidator;

describe (propertyName + " Handler Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        handler = new EmailDomainTLDValidator();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => handler.handle("com")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => handler.handle("")).toThrow(invalidFormatErrorMessage)
    });

    it (`throw an error when ${propertyName} is invalid.`, () => {
        expect (() => handler.handle("xcom")).toThrow(invalidFormatErrorMessage);
    });
});
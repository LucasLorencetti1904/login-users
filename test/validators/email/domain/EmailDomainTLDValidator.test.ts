import EmailDomainTLDValidator from "../../../../src/shared/util/validators/vanilla/email/domain/EmailDomainTLDValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";
import ErrorMessageGenerator from "../../../../src/shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email top level domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
= ErrorMessageGenerator.initWithDataName("Email top level domain"); 

const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailDomainTLDValidator("com")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => new EmailDomainTLDValidator("")).toThrow(invalidFormatErrorMessage)
    });

    it (`throw an error when ${propertyName} is invalid.`, () => {
        expect (() => new EmailDomainTLDValidator("xcom")).toThrow(invalidFormatErrorMessage);
    });
});
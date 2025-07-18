import EmailDomainSLDValidator from "../../../../src/shared/util/validators/vanilla/email/domain/EmailDomainSLDValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";
import ErrorMessageGenerator from "../../../../src/shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email second level domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email second level domain"); 

const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailDomainSLDValidator("outlook")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => new EmailDomainSLDValidator("")).toThrow(invalidFormatErrorMessage)
    });

    it (`${errorTestDescriptionPrefix} is invalid.`, () => {
        expect (() => new EmailDomainSLDValidator("gnail")).toThrow(invalidFormatErrorMessage);
    });
});
import EmailDomainValidator from "../../../src/shared/util/validators/vanilla/email/EmailDomainValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";
import ErrorMessageGenerator from "../../../src/shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email domain";

const successTestDescriptionPrefix: string = `passes without error when ${propertyName}`;
const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email"); 

const invalidFormatErrorMessage = errorMessage.hasAnInvalidFormat

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`${successTestDescriptionPrefix} (without country code) is valid.`, () => {
        expect (() => new EmailDomainValidator("gmail.com")).not.toThrowError();
    });

    it (`${successTestDescriptionPrefix} (with country code) is valid.`, () => {
        expect (() => new EmailDomainValidator("gmail.com.br")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid SLD.`, () => {
        expect (() => new EmailDomainValidator("blabla.com")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has an invalid TLD.`, () => {
        expect (() => new EmailDomainValidator("gmail.xcom")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has an invalid country code.`, () => {
        expect (() => new EmailDomainValidator("gmail.com.xx")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has all invalid parts.`, () => {
        expect (() => new EmailDomainValidator("blabla.xcom.xx")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has no number of dots.`, () => {
        expect (() => new EmailDomainValidator("gmailcombr")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has invalid number of dots.`, () => {
        expect (() => new EmailDomainValidator("gmail.com.br.br")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has invalid characters.`, () => {
        expect (() => new EmailDomainValidator("1gmail. com.br")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has not ordered.`, () => {
        expect (() => new EmailDomainValidator("br.com.gmail")).toThrow(invalidFormatErrorMessage);
    });
});
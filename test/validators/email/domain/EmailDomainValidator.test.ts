import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainValidator from "@validators/userData/email/domain/EmailDomainValidator";
import ErrorMessageGenerator from "@shared/errors/ErrorMessageGenerator";

const propertyName: string = "email domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email domain"); 
    
    const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat
    
    describe (propertyName + " validator test", () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailDomainValidator("gmail.com")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has no number of dots.`, () => {
        expect (() => new EmailDomainValidator("gmailcombr")).toThrow(invalidFormatErrorMessage);
    });
    
    it (`${errorTestDescriptionPrefix} has invalid number of dots.`, () => {
        expect (() => new EmailDomainValidator("gmail.com.br.br")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has an invalid top level.`, () => {
        expect (() => new EmailDomainValidator("gmail.xcom")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid second level.`, () => {
        expect (() => new EmailDomainValidator("blabla.com")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid contry code.`, () => {
        expect (() => new EmailDomainValidator("outlook.com.xx")).toThrowError();
    });
});
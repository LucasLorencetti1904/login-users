import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email domain"); 
    
const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

let validator: EmailDomainValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new EmailDomainValidator();
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("gmail.com")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has no number of dots.`, () => {
        expect (() => validator.validate("gmailcombr")).toThrow(invalidFormatErrorMessage);
    });
    
    it (`${errorTestDescriptionPrefix} has invalid number of dots.`, () => {
        expect (() => validator.validate("gmail.com.br.br")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has an invalid top level.`, () => {
        expect (() => validator.validate("gmail.xcom")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid second level.`, () => {
        expect (() => validator.validate("blabla.com")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid contry code.`, () => {
        expect (() => validator.validate("outlook.com.xx")).toThrowError();
    });
});
import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainCountryCodeValidator from "@validators/userData/fieldValidators/user/email/domain/EmailDomainCountryCodeValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email domain country code";

const successTestDescriptionPrefix: string = `passes without error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email domain country code"); 

let validator: EmailDomainCountryCodeValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new EmailDomainCountryCodeValidator();
    });

    it (`${successTestDescriptionPrefix} is valid.`, () => {
        expect (() => validator.validate("br")).not.toThrowError();
    });

    it (`${successTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate("")).not.toThrowError()
    });

    it (`throw an error when ${propertyName} is invalid.`, () => {
        expect (() => validator.validate("xx")).toThrow(errorMessage.hasAnInvalidFormat);
    });
});
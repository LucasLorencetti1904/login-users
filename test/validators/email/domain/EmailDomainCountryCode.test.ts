import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainCountryCodeValidator from "@validators/userData/email/domain/EmailDomainCountryCodeValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email domain country code";

const successTestDescriptionPrefix: string = `passes without error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email domain country code"); 

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it (`${successTestDescriptionPrefix} is valid.`, () => {
        expect (() => new EmailDomainCountryCodeValidator("br")).not.toThrowError();
    });

    it (`${successTestDescriptionPrefix} is empty.`, () => {
        expect (() => new EmailDomainCountryCodeValidator("")).not.toThrowError()
    });

    it (`throw an error when ${propertyName} is invalid.`, () => {
        expect (() => new EmailDomainCountryCodeValidator("xx")).toThrow(errorMessage.hasAnInvalidFormat);
    });
});
import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainCountryCodeValidator from "@validators/fieldValidators/user/impl/email/domain/parts/EmailDomainCountryCodeHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "email domain country code";

const successTestDescriptionPrefix: string = `passes without error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email domain country code"); 

let handler: EmailDomainCountryCodeValidator;

describe (propertyName + " Handler Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        handler = new EmailDomainCountryCodeValidator();
    });

    it (`${successTestDescriptionPrefix} is valid.`, () => {
        expect (() => handler.handle("br")).not.toThrowError();
    });

    it (`${successTestDescriptionPrefix} is empty.`, () => {
        expect (() => handler.handle("")).not.toThrowError()
    });

    it (`throw an error when ${propertyName} is invalid.`, () => {
        expect (() => handler.handle("xx")).toThrow(errorMessage.hasAnInvalidFormat);
    });
});
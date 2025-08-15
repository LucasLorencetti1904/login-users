import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailValidator from "@validators/fieldValidators/impl/user/impl/email/EmailValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import MockEmailUserPartHandler from "../mocks/MockEmailUserPartHandler";
import MockEmailDomainPartHandler from "../mocks/MockEmailDomainPartHandler";

const propertyName: string = "email";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email"); 

let validator: EmailValidator;

let userHandler: MockEmailUserPartHandler;
let domainHandler: MockEmailDomainPartHandler;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        userHandler = new MockEmailUserPartHandler();
        domainHandler = new MockEmailDomainPartHandler();

        validator = new EmailValidator("email", userHandler, domainHandler);
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("user@gmail.com")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate("")).toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} number of '@' is not equal to 1.`, () => {
        expect (() => validator.validate("userg@@mail.com")).toThrow(errorMessage.hasAnInvalidFormat);
    });

    it (`${errorTestDescriptionPrefix} user is invalid.`, () => {
        userHandler.willFail();

        expect (() => validator.validate("usr@gmail.com")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} domain is invalid.`, () => {
        domainHandler.willFail();

        expect (() => validator.validate("user@gnail.com")).toThrowError();
    });
});
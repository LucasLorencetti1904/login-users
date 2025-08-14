import { vi, describe, beforeEach, it, expect } from "vitest";
import EmailDomainPartHandler from "@validators/fieldValidators/user/impl/email/domain/base/EmailDomainPartHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import MockEmailDomainTLDHandler from "../mocks/MockEmailDomainTLDHandler";
import MockEmailDomainSLDHandler from "../mocks/MockEmailDomainSLDHandler";
import MockEmailDomainCountryCodeHandler from "../mocks/MockEmailDomainCountryCodeHandler";

const propertyName: string = "email domain";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`;

const errorMessage: ErrorMessageGenerator
    = ErrorMessageGenerator.initWithDataName("Email domain"); 
    
const invalidFormatErrorMessage: string = errorMessage.hasAnInvalidFormat

let TLDHandler: MockEmailDomainTLDHandler;
let SLDHandler: MockEmailDomainSLDHandler;
let countryCodeHandler: MockEmailDomainCountryCodeHandler;

let handler: EmailDomainPartHandler;

describe (propertyName + " Handler Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        TLDHandler = new MockEmailDomainTLDHandler();
        SLDHandler = new MockEmailDomainSLDHandler();
        countryCodeHandler = new MockEmailDomainCountryCodeHandler();

        handler = new EmailDomainPartHandler(TLDHandler, SLDHandler, countryCodeHandler);
    });

    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => handler.handle("gmail.com")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has no number of dots.`, () => {
        expect (() => handler.handle("gmailcombr")).toThrow(invalidFormatErrorMessage);
    });
    
    it (`${errorTestDescriptionPrefix} has invalid number of dots.`, () => {
        expect (() => handler.handle("gmail.com.br.br")).toThrow(invalidFormatErrorMessage);
    });

    it (`${errorTestDescriptionPrefix} has an invalid top level.`, () => {
        TLDHandler.willFail();

        expect (() => handler.handle("gmail.xcom")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid second level.`, () => {
        SLDHandler.willFail();

        expect (() => handler.handle("blabla.com")).toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid contry code.`, () => {
        countryCodeHandler.willFail();

        expect (() => handler.handle("outlook.com.xx")).toThrowError();
    });
});